import { getProfileName, login } from '../api/auth'
import logo from '../assets/logo.svg'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

const LoginPage = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const token = useAuthStore((status) => status.token)
  const setToken = useAuthStore((status) => status.setToken)
  const setProfile = useAuthStore((status) => status.setProfile)
  const setRole = useAuthStore((status) => status.setRole)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const resLogin = await login(user, password)
      const role = await (
        await getProfileName(resLogin.data.user.id_profile)
      ).data.profile.name

      setRole(role)
      setToken(resLogin.data.token)
      setProfile(resLogin.data.user)
      setError(false)

      navigate('/')
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(true)
        console.error(err.response?.data.message)
      } else {
        setError(true)
        console.error(err)
      }
    }
    setUser('')
    setPassword('')
  }
  const handleRedirect = () => {
    if (token) {
      navigate('/')
    }
  }

  useEffect(() => {
    handleRedirect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="w-full h-screen ">
      <div className="pt-8 pb-6 w-full">
        <img src={logo} alt="logo" className="w-14 h-14 mx-auto" />
      </div>

      <main className="relative h-[368px]">
        <div className="w-[340px] mx-auto px-4 h-full">
          <div className="text-xl font-extralight mb-4 text-center p-0">
            <h1>Ingreso de Usuarios</h1>
          </div>
          {error && (
            <div className="bg-[#25171C]  text-center rounded-md w-[300px] mx-auto mb-6 border-red-950 border">
              <p className="p-4 text-sm">Usuario o contraseña incorrectos</p>
            </div>
          )}
          <div className="bg-[#161B22] border border-[#161B22] rounded-md">
            <form className="p-4" onSubmit={handleSubmit}>
              <label htmlFor="login_field" className="text-sm font-light">
                Username
              </label>
              <input
                value={user}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUser(e.target.value)
                }}
                type="text"
                id="login_field"
                className="w-full rounded-md px-3 py-[3px] mt-1 mb-4 bg-[#0D1117] border border-[#30363D]"
              />
              <label htmlFor="password_field" className="text-sm font-light">
                Password
              </label>
              <input
                value={password}
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value)
                }}
                id="password_field"
                className="w-full rounded-md px-3 py-[3px] mt-1 mb-4 bg-[#0D1117] border border-[#30363D]"
              />
              <input
                type="submit"
                value="Ingresar"
                className="w-full bg-[#238636] text-sm rounded-md px-4 py-[5px] mt-1 hover:cursor-pointer hover:bg-[#2ea043]"
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage

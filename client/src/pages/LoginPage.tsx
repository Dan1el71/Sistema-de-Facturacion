import logo from '../assets/logo.svg'

const LoginPage = () => {
  return (
    <div className="w-full h-screen">
      <div className="pt-8 pb-6 fixed w-full">
        <img src={logo} alt="logo" className="w-14 h-14 mx-auto" />
      </div>

      <main className="relative top-28 h-[368px]">
        <div className="w-[340px] mx-auto px-4 h-full">
          <div className="text-xl font-extralight mb-4 text-center p-0">
            <h1>Ingreso de Usuarios</h1>
          </div>
          <div className="bg-[#161B22] border border-[#161B22] rounded-md">
            <form className="p-4">
              <label htmlFor="login_field" className="text-sm font-light">
                Username
              </label>
              <input
                type="text"
                id="login_field"
                className="w-full rounded-md px-3 py-[3px] mt-1 mb-4 bg-[#0D1117] border border-[#30363D]"
              />
              <label htmlFor="password_field" className="text-sm font-light">
                Password
              </label>
              <input
                type="password"
                id="password_field "
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

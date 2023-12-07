import logo from '../assets/logo.svg'

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="pt-8 pb-6 fixed top-0 w-full flex justify-center">
        <img src={logo} alt="logo" className="w-14 h-14" />
      </div>

      <main className="">
        <p></p>
        <form className="bg-[#161B22] flex flex-col w-2/6">
          <label>
            <span>Username</span>
            <input />
          </label>
          <label>
            <span>Password</span>
            <input />
          </label>
        </form>
      </main>
    </div>
  )
}
export default LoginPage

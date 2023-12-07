import { useAuthStore } from '../store/auth'

const HomePage = () => {
  const user = useAuthStore((state) => state.profile)

  const name = user?.name.toUpperCase()
  const middle_name = user?.middle_name?.toUpperCase()

  return (
    <div className="m-auto text-2xl font-bold">
      <h1>
        Bienvenido, {name} {middle_name}{' '}
      </h1>
    </div>
  )
}
export default HomePage

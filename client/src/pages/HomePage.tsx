import { useAuthStore } from '../store/auth'

const HomePage = () => {
  const user = useAuthStore((state) => state.profile)
  const rol = useAuthStore((state) => state.role)
  const name = user?.name.toUpperCase()
  const middle_name = user?.middle_name?.toUpperCase()

  return (
    <div className="m-auto">
      <div className="text-2xl font-bold">
        <h1>
          Bienvenido, {name} {middle_name}{' '}
        </h1>
      </div>

      <footer className="text-center">
        <p>
          Tu rol es <strong>{rol}</strong>
        </p>
      </footer>
    </div>
  )
}
export default HomePage

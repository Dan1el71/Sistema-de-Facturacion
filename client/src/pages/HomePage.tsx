import { useAuthStore } from '../store/auth'

const HomePage = () => {
  const user = useAuthStore((state) => state.profile)
  const rol = user?.role
  const name = user?.name.toUpperCase()

  return (
    <div className="m-auto">
      <div className="text-2xl">
        <h1>
          Bienvenido, <strong>{name}</strong>
        </h1>
      </div>

      <footer className="text-center">
        <p>
          Tu rol es <strong>{rol == 1 ? 'Administrador' : 'Cajero'}</strong>
        </p>
      </footer>
    </div>
  )
}
export default HomePage

import { Link } from 'react-router-dom'

const SideBar = () => {
  const menuOptions = [
    {
      name: 'Clientes',
      path: '/clientes',
      icon: 'bi bi-people',
    },
    {
      name: 'Productos',
      path: '/productos',
      icon: 'bi bi-bag',
    },
    {
      name: 'Usuarios',
      path: '/usuarios',
      icon: 'bi bi-person',
    },
    {
      name: 'Facturacion',
      path: '/facturacion',
      icon: 'bi bi-file-earmark-text',
    },
    {
      name: 'Reportes',
      path: '/reportes',
      icon: 'bi bi-file-earmark-bar-graph',
    },
  ]

  return (
    <div className="bg-[#010409] w-72 h-screen ">
      <h1 className="text-center font-semibold text-xl py-5">Facturacion</h1>
      <ul className="mt-6">
        {menuOptions.map((option) => (
          <li key={option.name}>
            <Link
              to={option.path}
              className="flex items-center px-4 mx-2 my-2 py-2 hover:bg-[#171B20] rounded-md"
            >
              <i className={`${option.icon} mr-3`}></i>
              {option.name}
            </Link>
          </li>
        ))}
        <li>
          <button className="flex items-center px-4 py-2 mx-2 hover:bg-[#171B20] rounded-md fixed bottom-2">
            <i className="bi bi-box-arrow-right mr-3"></i>
            Cerrar sesion
          </button>
        </li>
      </ul>
    </div>
  )
}
export default SideBar

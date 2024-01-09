import { createColumnHelper } from '@tanstack/react-table'
import { User } from '../../types/types'
import { useState } from 'react'
import { getUserById } from '../../api/user'
import ItemTable from '../ItemTable'
import Error from '../Error'

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'Nombre',
  }),
  columnHelper.accessor('middle_name', {
    cell: (info) => (info.getValue() !== null ? info.getValue() : '-'),
    header: 'Apellido',
  }),
  columnHelper.accessor('user', {
    cell: (info) => info.getValue(),
    header: 'Usuario',
  }),
  columnHelper.accessor('id_profile', {
    cell: (info) => info.getValue(),
    header: 'Perfil',
  }),
]

const UserSearch = () => {
  const [userId, setUserId] = useState<string>('')
  const [userData, setUserData] = useState<User[]>([])
  const [error, setError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData([])
    const inputValue = e.currentTarget.value
    if (/^\d*$/.test(inputValue)) {
      setUserId(inputValue)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() < setError(false)

    try {
      const response = await getUserById(parseInt(userId))
      setUserData([response.data.user])
    } catch (err) {
      setError(true)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded-md px-3 py-[3px] m-1 mt-6 bg-[#0D1117] border border-[#30363D]"
          type="number"
          name="userId"
          placeholder="Id del usuario"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="mx-5 bg-[#238636] text-sm rounded-md px-4 py-[5px] mt-1 hover:cursor-pointer hover:bg-[#2ea043]"
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </form>
      {error && <Error>No se encontro el usuario</Error>}

      {Object.keys(userData).length > 0 && (
        <>
          <ItemTable data={userData} columns={columns} />
        </>
      )}
    </div>
  )
}
export default UserSearch

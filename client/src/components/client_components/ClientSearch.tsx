import { useState } from 'react'
import { AxiosError } from 'axios'
import { getClientById } from '../../api/client'
import { ClientSearchProps, Identification } from '../../types/types'
import Error from '../Error'

const ClientSearch = ({
  setIdData,
  setTableData,
  identificationTypes,
}: ClientSearchProps) => {
  const [id, setId] = useState<string | null>(null)
  const [idType, setIdType] = useState<number | null>(null)
  const [error, setError] = useState(false)

  const handleIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdData([])
    const inputValue = e.currentTarget.value
    if (/^\d*$/.test(inputValue)) {
      setId(inputValue)
    }
  }

  const getIdentificationAbbr = (idType: number) => {
    const type = identificationTypes.find(
      (type) => type.identification_type === idType
    )
    return type?.abreviature || ''
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIdData([])
    if (setTableData) {
      setTableData([])
    }

    if (idType !== null && id !== null) {
      try {
        const res = await getClientById(idType, parseInt(id))
        const responseData = await res.data
        setError(false)

        const formattedDate = new Date(
          responseData.client.register_date
        ).toLocaleDateString('es-ES')

        const formattedData = {
          ...responseData.client,
          register_date: formattedDate,
          identification_type: getIdentificationAbbr(idType),
        }

        setIdData([formattedData])
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(true)
        } else {
          console.error(err)
        }
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          name="idType"
          required
          className="bg-[#161b22] p-1 ml-1 mb-1 rounded-md mr-6 mt-6 border border-gray-600"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setIdData([])
            setIdType(Number(e.target.value))
          }}
        >
          <option value="" label="" />
          {identificationTypes.map((id: Identification) => (
            <option
              key={id.abreviature}
              value={id.identification_type}
              label={id.abreviature}
            >
              {id.abreviature}
            </option>
          ))}
        </select>
        <input
          className="rounded-md px-3 py-[3px] mt-1 bg-[#0D1117] border border-[#30363D]"
          type="text"
          name="id"
          value={id || ''}
          placeholder="Número de identificación"
          onChange={handleIdInputChange}
        />
        <button
          type="submit"
          className="mx-6 bg-[#238636] text-sm rounded-md px-4 py-[5px] mt-1 hover:cursor-pointer hover:bg-[#2ea043]"
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </form>
      {error && <Error>No se encontro al cliente</Error>}
    </div>
  )
}
export default ClientSearch

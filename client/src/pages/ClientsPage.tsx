import { useState, useEffect } from 'react'
import { getClientById, getIdTypes } from '../api/auth'
import { AxiosError } from 'axios'
import Error from '../components/Error'

import { Client, Identification } from '../types/types'
import ClientTable from '../components/ClientTable'

const ClientsPage = () => {
  const [identificationTypes, setIdentificationTypes] = useState<
    Identification[]
  >([])
  const [id, setId] = useState<string | null>(null)
  const [idType, setIdType] = useState<number | null>(null)
  const [data, setData] = useState<Client[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getIdTypes()
        setIdentificationTypes(types.data.idTypes)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const handleIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setData([])

    if (idType !== null && id !== null) {
      try {
        const res = await getClientById(idType, parseInt(id))
        const responseData = await res.data
        setError(false)

        const formattedDate = new Date(
          responseData.clientFound.register_date
        ).toLocaleDateString('es-ES')

        const formattedData = {
          ...responseData.clientFound,
          register_date: formattedDate,
          identification_type: getIdentificationAbbr(idType),
        }
        console.log(idType, identificationTypes)
        setData([formattedData])
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
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Clientes</h1>
      </div>
      <div>
        <div className="my-4 mx-12">
          <h2>
            <i className="pr-2 bi bi-search" />
            Consulta de clientes
          </h2>
          <form onSubmit={handleSubmit}>
            <select
              name="idType"
              required
              className="bg-[#161b22] p-1 ml-1  rounded-md mr-6 mt-6 mb-2 border border-gray-600"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setIdType(Number(e.target.value))
              }
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
              className="rounded-md px-3 py-[3px] mt-1 mb-4 bg-[#0D1117] border border-[#30363D]"
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
          {Object.keys(data).length > 0 && <ClientTable data={data} />}
        </div>
      </div>
    </div>
  )
}
export default ClientsPage

import { useEffect, useState } from 'react'

import { Client, Identification } from '../types/types'
import { getIdTypes } from '../api/client'
import { useAuthStore } from '../store/auth'
import ClientTable from '../components/client_components/ClientTable'
import ClientSearch from '../components/client_components/ClientSearch'
import RegisterClient from '../components/client_components/RegisterClient'
import UpdateClient from '../components/client_components/UpdateClient'

const ClientsPage = () => {
  const [idData, setIdData] = useState<Client[]>([])
  const role = useAuthStore((state) => state.profile?.role)
  const [identificationTypes, setIdentificationTypes] = useState<
    Identification[]
  >([])

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

  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Clientes</h1>
      </div>

      <div id="Consultar" className="mx-12 my-4">
        <h2>
          <button>
            <i className="bi bi-signpost"></i>
          </button>
          <i className="pr-2 bi bi-search" />
          Consultar cliente
        </h2>
        <ClientSearch
          identificationTypes={identificationTypes}
          setIdData={setIdData}
        />
        <div>
          {Object.keys(idData).length > 0 && <ClientTable data={idData} />}
        </div>
      </div>

      {role === 1 && (
        <div>
          <div id="Registrar" className="my-6 mx-12 flex">
            <RegisterClient identificationTypes={identificationTypes} />
          </div>
          <div id="Modificar">
            <UpdateClient identificationTypes={identificationTypes} />
          </div>
        </div>
      )}
    </div>
  )
}
export default ClientsPage

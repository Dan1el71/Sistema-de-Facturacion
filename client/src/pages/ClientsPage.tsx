import { useState } from 'react'

import { Client } from '../types/types'
import ClientTable from '../components/client_components/ClientTable'
import ClientSearch from '../components/client_components/ClientSearch'
import { useAuthStore } from '../store/auth'
import RegisterClient from '../components/client_components/RegisterClient'
import UpdateClient from '../components/client_components/UpdateClient'

const ClientsPage = () => {
  const [idData, setIdData] = useState<Client[]>([])
  const role = useAuthStore((state) => state.profile?.role)

  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Clientes</h1>
      </div>
      <div id="Consultar">
        <ClientSearch title="Consultar cliente" setIdData={setIdData} />
        <div className="mx-12">
          {Object.keys(idData).length > 0 && <ClientTable data={idData} />}
        </div>
      </div>

      {role === 1 && (
        <div>
          <div id="Registrar" className="my-6 mx-12">
            <RegisterClient />
          </div>
          <div>
            <div id="Modificar">
              <UpdateClient />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ClientsPage

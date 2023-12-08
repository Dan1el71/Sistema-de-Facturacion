import { useState } from 'react'

import { Client } from '../types/types'
import ClientTable from '../components/client_components/ClientTable'
import ClientSearch from '../components/client_components/ClientSearch'

const ClientsPage = () => {
  const [data, setData] = useState<Client[]>([])

  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Clientes</h1>
      </div>
      <div id="Consultar">
        <div>
          <ClientSearch title='Consultar cliente' setData={setData} />
        </div>
        <div className="mx-12">
          {Object.keys(data).length > 0 && <ClientTable data={data} />}
        </div>
      </div>
    </div>
  )
}
export default ClientsPage

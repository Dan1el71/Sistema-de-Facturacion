import { useState } from 'react'
import { Client } from '../types/types'
import ClientSearch from '../components/client_components/ClientSearch'

const FacturacionPage = () => {
  const [data, setData] = useState<Client[]>([])

  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Facturacion</h1>
      </div>
      <div>
        <ClientSearch title="Seleccione un cliente" setData={setData} />
      </div>
      <div>
        {data.length > 0 && (
          <div className="mx-12">
            <div>
              <p className="break-normal">
                Se ha cargado correctamente al cliente
              </p>
              <p className="font-semibold ">
                <i className="bi bi-person"></i>
                {` ${data[0].identification_type} ${data[0].identification} - ${data[0].social_reason}`}
              </p>
            </div>
            <div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default FacturacionPage

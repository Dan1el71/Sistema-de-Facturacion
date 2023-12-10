import { useState } from 'react'
import { Client, Invoice } from '../types/types'
import ClientSearch from '../components/client_components/ClientSearch'
import ProductTable from '../components/products_components/ProductTable'

const FacturacionPage = () => {
  const [idData, setIdData] = useState<Client[]>([])
  const [tableData, setTableData] = useState<Invoice[]>([])

  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Facturacion</h1>
      </div>
      <div>
        <ClientSearch
          title="Seleccione un cliente"
          setIdData={setIdData}
          setTableData={setTableData}
        />
      </div>
      {idData.length > 0 && (
        <div className="mx-12">
          <div>
            <p className="break-normal">
              Se ha cargado correctamente al cliente
            </p>
            <p className="font-semibold ">
              <i className="bi bi-person"></i>
              {` ${idData[0].identification_type} ${idData[0].identification} - ${idData[0].social_reason}`}
            </p>
          </div>
          <div>
            <div>
              <p className="break-normal pt-5 mb-4">
                <i className="pr-2 bi bi-search"></i>
                Agregue los productos a facturar
              </p>
            </div>
            <div></div>
          </div>
          <ProductTable tableData={tableData} setTableData={setTableData} />
        </div>
      )}
    </div>
  )
}
export default FacturacionPage

import { useState } from 'react'
import { Client, Invoice, InvoiceDetails } from '../types/types'
import ClientSearch from '../components/client_components/ClientSearch'
import ProductTable from '../components/products_components/ProductTable'
import Swal from 'sweetalert2'

const FacturacionPage = () => {
  const [idData, setIdData] = useState<Client[]>([])
  const [tableData, setTableData] = useState<Invoice[]>([])

  const saveInvoiceDetails = async () => {
    const invoiceDetails: InvoiceDetails = {
      consecutive: idData[0].client,
      products: tableData.map((product) => ({
        productId: product.id_product,
        quantity: product.quantity,
        unit_price: product.unitPrice,
      })),
    }

    console.log(invoiceDetails)
    const alert = await Swal.fire({
      title: 'Hecho!',
      text: 'Factura guardada correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    })
    if (alert.isConfirmed) {
      setIdData([])
      setTableData([])
    }
  }

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
          {tableData.length > 0 && (
            <div className="mt-3 flex justify-between">
              <button
                onClick={saveInvoiceDetails}
                className="bg-green-button hover:bg-green-button-hover rounded-md px-3 py-2"
              >
                <i className="bi bi-save"></i> <span>Guardar</span>
              </button>
              <button>
                <i className="bi bi-printer"></i> <span>Imprimir</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default FacturacionPage

import { useState } from 'react'
import { Client, Invoice, InvoiceDetails } from '../types/types'
import ClientSearch from '../components/client_components/ClientSearch'
import ProductTable from '../components/products_components/ProductTable'
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import { newInvoiceDetails } from '../api/product'

const FacturacionPage = () => {
  const [idData, setIdData] = useState<Client[]>([])
  const [tableData, setTableData] = useState<Invoice[]>([])

  const exportPDF = () => {
    const total = tableData
      .reduce((acc, product) => acc + product.unitPrice * product.quantity, 0)
      .toLocaleString()

    const unit = 'pt'
    const size = 'A4'
    const orientation = 'portrait'

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    const title = 'Comprobante de Facturacion'
    const headers = [['ID', 'Name', 'Quantity', 'Unit Price', 'Total']]
    const foot = [['', '', '', 'Total facturado:', `$ ${total}`]]

    const data = tableData.map((elt) => [
      elt.id_product,
      elt.name,
      elt.quantity,
      '$ ' + elt.unitPrice,
      '$ ' + elt.total.toLocaleString(),
    ])

    const content = {
      startY: 50,
      head: headers,
      body: data,
      foot,
    }

    doc.text(title, marginLeft, 40)
    autoTable(doc, content)
    doc.save('comprobante.pdf')
  }

  const saveInvoiceDetails = async () => {
    const invoiceDetails: InvoiceDetails = {
      clientId: idData[0].client,
      products: tableData.map((product) => ({
        productId: product.id_product,
        quantity: parseInt(product.quantity as unknown as string),
        unitPrice: parseInt(product.unitPrice as unknown as string),
      })),
    }

    await newInvoiceDetails(invoiceDetails)
    exportPDF()

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
      <div className='mx-12 my-4'>
        <h2>
          <i className="pr-2 bi bi-search" />
          Seleccionar cliente
        </h2>
        <ClientSearch setIdData={setIdData} setTableData={setTableData} />
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
                className="bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2"
              >
                <i className="bi bi-save"></i>{' '}
                <span className="mx-1">Guardar</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default FacturacionPage

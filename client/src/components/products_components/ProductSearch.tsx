import { useState } from 'react'
import { getProductById } from '../../api/product'
import { Product } from '../../types/types'
import ItemInfoTable from '../ItemTable'
import { createColumnHelper } from '@tanstack/react-table'
import Error from '../Error'

const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'Nombre',
  }),
  columnHelper.accessor('state', {
    cell: (info) => info.getValue(),
    header: 'Estado',
  }),
  columnHelper.accessor('unit_price', {
    cell: (info) => info.getValue(),
    header: 'Precio unitario',
  }),
]

const ProductSearch = () => {
  const [productId, setProductId] = useState<string>('')
  const [productData, setProductData] = useState<Product[]>([])
  const [error, setError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData([])
    const inputValue = e.currentTarget.value
    if (/^\d*$/.test(inputValue)) {
      setProductId(inputValue)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)

    try {
      const response = await getProductById(parseInt(productId))
      setProductData([response.data.product])
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
          name="productID"
          placeholder="ID del product"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="mx-5 bg-[#238636] text-sm rounded-md px-4 py-[5px] mt-1 hover:cursor-pointer hover:bg-[#2ea043]"
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </form>
      {error && <Error>No se encontro el producto</Error>}

      {Object.keys(productData).length > 0 && (
        <>
          <ItemInfoTable data={productData} columns={columns} />
        </>
      )}
    </div>
  )
}
export default ProductSearch

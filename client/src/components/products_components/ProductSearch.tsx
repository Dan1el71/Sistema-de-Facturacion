import { useState } from 'react'
import { getProductById } from '../../api/product'
import { Product } from '../../types/types'

const ProductSearch = () => {
  const [productData, setProductData] = useState<Product>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const productId = parseInt((e.currentTarget[0] as HTMLInputElement).value)

    try {
      const response = await getProductById(productId)
      setProductData(response.data.product)
      console.log(productData)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded-md px-3 py-[3px] m-1 bg-[#0D1117] border border-[#30363D]"
          type="number"
          name="productID"
          placeholder="ID del product"
        />
        <button
          type="submit"
          className="mx-5 bg-[#238636] text-sm rounded-md px-4 py-[5px] mt-1 hover:cursor-pointer hover:bg-[#2ea043]"
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </form>
    </div>
  )
}
export default ProductSearch

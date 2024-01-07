import { useState } from 'react'
import { getProductById } from '../../api/product'
import Error from '../Error'

const UpdateProduct = () => {
  const [product, setProduct] = useState<Record<string, string>>({})
  const [error, setError] = useState(false)

  const fields = [
    {
      name: 'name',
      placeholder: 'Nombre',
      type: 'text',
    },
    {
      name: 'state',
      placeholder: 'Estado',
      type: 'text',
    },
    {
      name: 'unit_price',
      placeholder: 'Precio',
      type: 'number',
    },
  ]
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProduct({})
    setError(false)

    try {
      const id = parseInt((e.currentTarget[0] as HTMLInputElement).value)
      const response = await getProductById(id)
      setProduct(response.data.product)
    } catch (err) {
      setError(true)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, state, unit_price } = product

      console.log(name, state, parseInt(unit_price))
      
      
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded-md px-3 py-[3px] m-1 mt-6 bg-[#0D1117] border border-[#30363D]"
          type="number"
          name="productID"
          placeholder="Seleccione un producto"
        />
        <button
          type="submit"
          className="mx-5 bg-[#238636] text-sm rounded-md px-4 py-[5px] mt-1 hover:cursor-pointer hover:bg-[#2ea043]"
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>

        {error && (
          <div className="pt-4">
            <Error>Producto no encontrado</Error>
          </div>
        )}
      </form>
      {product && (
        <form onSubmit={handleUpdate}>
          {fields.map((field) => (
            <input
              key={field.name}
              required
              placeholder={field.placeholder}
              className="flex-1 text-center rounded-md px-3 py-[3px] m-1 mt-4 bg-[#0D1117] border border-[#30363D]"
              name={field.name}
              type={field.type}
              value={product[field.name] || ''}
              onChange={handleChange}
            />
          ))}
          <button
            type="submit"
            className="mx-5 bg-[#238636] text-sm rounded-md px-4 py-[5px] mt-1 hover:cursor-pointer hover:bg-[#2ea043]"
          >
            <i className="bi bi-caret-right-fill"></i>
          </button>
        </form>
      )}
    </div>
  )
}
export default UpdateProduct

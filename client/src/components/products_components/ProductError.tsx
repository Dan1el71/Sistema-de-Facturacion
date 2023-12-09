import { ProductErrorProps } from '../../types/types'

const ProductError = ({ id, message }: ProductErrorProps) => {
  return (
    <div className="bg-[#25171C] text-center rounded-md px-4 py-1 mt-2 border-red-950 ml-1">
      {message ? (
        <p className="px-4 py-1 text-sm">{message}</p>
      ) : (
        <p className="px-4 py-1 text-sm">
          Producto <span className="font-semibold">{id}</span> no encontrado
        </p>
      )}
    </div>
  )
}

export default ProductError

import { useState } from 'react'
import { FooterCellProps } from '../../types/types'
import ProductError from './ProductError'

export const FooterCell = ({ table }: FooterCellProps) => {
  const meta = table.options.meta
  const [id, setId] = useState<string>('')

  const selectedRows = table.getSelectedRowModel().rows
  const removeRows = () => {
    meta?.removeSelectedRows(selectedRows.map((row) => row.index))
    table.resetRowSelection()
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
    meta?.setError(false)
  }

  const handleAddRow = () => {
    if (/^[1-9]\d*$/.test(id.toString())) {
      meta?.addRow(parseInt(id))
    } else {
      meta?.setError(true)
    }
  }

  return (
    <div className="flex justify-between mx-4 mb-4 font-normal">
      <div>
        <input
          className="p-1 ml-1 mt-6 mb-2 rounded-md text-center border bg-[#161b22] border-gray-600"
          value={id}
          onChange={handleInputChange}
          type="number"
          placeholder="ID del producto"
        />
        <button
          title="Agregar producto"
          onClick={handleAddRow}
          className="bg-green-button hover:bg-green-button-hover rounded-md py-1 mx-4 px-4"
        >
          <i className="bi bi-plus-circle"></i>
        </button>{' '}
        <span>{table.getRowModel().rows.length} productos</span>
        <div>
          {meta?.error &&
            (parseInt(id) > 0 ? (
              <ProductError id={id} />
            ) : (
              <ProductError message="Digite un producto valido" />
            ))}
        </div>
      </div>
      {selectedRows.length > 0 && (
        <div className="flex items-center mt-3">
          <button
            title="Eliminar seleccionados"
            className="rounded-md py-1 px-4 hover:bg-red-700 bg-red-600"
            onClick={removeRows}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )}
    </div>
  )
}

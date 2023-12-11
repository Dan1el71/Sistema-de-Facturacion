import { useState, useMemo } from 'react'
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

  const totalRows = table.getRowModel().rows

  const total = useMemo(() => {
    return totalRows.reduce((acc, row) => acc + (row.original.total || 0), 0)
  }, [totalRows]).toLocaleString()

  return (
    <div className="flex justify-between mx-4 mb-4 font-normal">
      <div>
        <input
          id="Add product input"
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
        <span>{totalRows.length} productos</span>
        <div>
          {meta?.error &&
            (parseInt(id) > 0 ? (
              <ProductError id={id} />
            ) : (
              <ProductError message="Digite un producto valido" />
            ))}
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="mx-4">
          <i className="pr-2 bi bi-cash"></i>Total facturado: ${total}
        </span>
        {selectedRows.length > 0 && (
          <button
            title="Eliminar seleccionados"
            className="rounded-md py-1 px-4 hover:bg-red-700 bg-red-600"
            onClick={removeRows}
          >
            <i className="bi bi-trash"></i>
          </button>
        )}
      </div>
    </div>
  )
}

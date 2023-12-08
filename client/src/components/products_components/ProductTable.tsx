import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Invoice } from '../../types/types'
import defaultColumn from './DefaultColumn'
import EditCell from './EditCellColumn'

const columnHelper = createColumnHelper<Invoice>()

const columns = [
  columnHelper.accessor('id_product', {
    header: 'ID',
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('name', {
    header: 'Nombre',
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('quantity', {
    header: 'Cantidad',
    meta: {
      type: 'number',
      editable: true,
    },
  }),
  columnHelper.accessor('unitPrice', {
    header: 'Precio unitario',
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('total', {
    header: 'Total',
    meta: {
      type: 'number',
    },
  }),
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]

const ProductTable = () => {
  const [tableData, setTableData] = useState([
    {
      id_product: 1,
      name: 'Producto 1',
      quantity: 1,
      unitPrice: 1000,
      total: 1000,
    },
    {
      id_product: 2,
      name: 'Producto 2',
      quantity: 2,
      unitPrice: 2000,
      total: 4000,
    },
    {
      id_product: 3,
      name: 'Producto 3',
      quantity: 3,
      unitPrice: 3000,
      total: 9000,
    },
  ])
  const [editedRows, setEditedRows] = useState<Record<string, boolean>>({})

  const table = useReactTable({
    data: tableData,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index == rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
  })

  return (
    <table className="w-full border-collapse border border-gray-300 text-center mt-4">
      <thead className="bg-[#161b22]">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="py-2 px-4 font-semibold">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-[#171B20]">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-2 px-4 border">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default ProductTable

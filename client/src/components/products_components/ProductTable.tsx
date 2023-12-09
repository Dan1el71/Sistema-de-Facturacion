import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Invoice, Product, ProductTableProps } from '../../types/types'
import defaultColumn from './DefaultColumn'
import EditCell from './EditCellColumn'
import { FooterCell } from './FooterCell'
import { getProductById } from '../../api/product'

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

const ProductTable = ({ tableData, setTableData }: ProductTableProps) => {
  const [originalData, setOriginalData] = useState<Invoice[]>(tableData)
  const [editedRows, setEditedRows] = useState<Record<number, boolean>>({})
  const [error, setError] = useState<boolean>(false)

  const table = useReactTable({
    data: tableData,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      error,
      setError,
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setTableData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          )
        } else {
          setOriginalData((old) =>
            old.map((row, index) =>
              index === rowIndex ? tableData[rowIndex] : row
            )
          )
        }
      },
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setTableData((old: Invoice[]) =>
          old.map((row: Invoice, index: number) => {
            if (index === rowIndex && columnId === 'quantity') {
              return {
                ...row,
                quantity: value as number,
                total: ((value as number) || 0) * (row.unitPrice || 0),
              }
            }
            return row
          })
        )
      },
      addRow: async (id: number) => {
        try {
          const productInfo: Product = await (
            await getProductById(id)
          ).data.productFound

          const newRow: Invoice = {
            id_product: productInfo.id,
            name: productInfo.name,
            quantity: 0,
            unitPrice: productInfo.unit_price,
            total: 0,
          }
          const setFunc = (old: Invoice[]) => [...old, newRow]
          setEditedRows((old: Record<number, boolean>) => ({
            ...old,
            [Object.keys(tableData).length]: true,
          }))
          setTableData(setFunc)
          setOriginalData(setFunc)
        } catch (err) {
          setError(true)
        }
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: Invoice[]) =>
          old.filter((_row: Invoice, index: number) => index !== rowIndex)
        setTableData(setFilterFunc)
        setOriginalData(setFilterFunc)
      },
      removeSelectedRows: (selectedRows: number[]) => {
        const setFilterFunc = (old: Invoice[]) =>
          old.filter((_row, index) => !selectedRows.includes(index))
        setTableData(setFilterFunc)
        setOriginalData(setFilterFunc)
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
              <td key={cell.id} className="py-1 border">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={table.getCenterLeafColumns().length} align="right">
            <FooterCell table={table} />
          </th>
        </tr>
      </tfoot>
    </table>
  )
}
export default ProductTable

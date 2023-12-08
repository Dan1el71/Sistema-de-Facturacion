import { Client } from '../types/types'
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'

interface Props {
  data: Client[]
}

const columnHelper = createColumnHelper<Client>()

const columns = [
  columnHelper.accessor('client', {
    cell: (info) => info.getValue(),
    header: 'Cliente',
  }),
  columnHelper.accessor('identification_type', {
    cell: (info) => info.getValue(),
    header: 'Tipo de identificación',
  }),
  columnHelper.accessor('identification', {
    cell: (info) => info.getValue(),
    header: 'Identificación',
  }),
  columnHelper.accessor('social_reason', {
    cell: (info) => info.getValue(),
    header: 'Razón social',
  }),
  columnHelper.accessor('register_date', {
    cell: (info) => info.getValue(),
    header: 'Fecha de registro',
  }),
  columnHelper.accessor('state', {
    cell: (info) => info.getValue(),
    header: 'Estado',
  }),
]

const ClientTable = ({ data }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
export default ClientTable

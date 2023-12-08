/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table'
import { Invoice } from '../../types/types'
import { useEffect, useState } from 'react'

const defaultColumn: Partial<ColumnDef<Invoice>> = {
  cell: ({ getValue, row: { index }, column: { id, columnDef }, table }) => {
    const initialValue = getValue()

    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    if (columnDef.meta?.editable) {
      return (
        <input
          className="w-full text-center bg-[#0d1117] rounded-md border border-gray-800"
          value={value as string}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onBlur={onBlur}
          type={columnDef.meta?.type}
        />
      )
    }

    return <div>{value as string}</div>
  },
}

export default defaultColumn
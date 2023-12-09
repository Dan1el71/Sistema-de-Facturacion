/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row } from '@tanstack/react-table'
import { RowData, Table } from '@tanstack/react-table'

export type State = {
  token: string
  profile: User | null
  isAuth: boolean
  role: string
}

export type Actions = {
  setToken: (token: string) => void
  setProfile: (profile: User) => void
  setRole: (role: string) => void
  logout: () => void
}

export type User = {
  id_user: number
  name: string
  middle_name: string | null
  user: string
  id_profile: number
}

export type Identification = {
  identification_type: number
  abreviature: string
  description: string
}

export type Client = {
  client: number
  identification: string
  identification_type: string
  register_date: string
  social_reason: string
  state: string
}

export type Product = {
  id: number
  name: string
  state: string
  unit_price: number
}

export type Invoice = {
  id_product: number
  name: string
  quantity: number
  unitPrice: number
  total: number
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    editedRows: Record<number, boolean>
    setEditedRows: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
    revertData: (rowIndex: number, revert: boolean) => void
    addRow: () => void
    removeRow: (rowIndex: number) => void
    removeSelectedRows: (selectedRows: number[]) => void
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    type?: string
    editable?: boolean | false
  }
}

export type FooterCellProps = {
  table: Table<Invoice>
}

export type EditCellProps = {
  row: Row<Invoice>
  table: Table<Invoice>
}

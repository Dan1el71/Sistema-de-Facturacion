/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row } from '@tanstack/react-table'
import { RowData, Table } from '@tanstack/react-table'

export type State = {
  token: string
  profile: User | null
  isAuth: boolean
}

export type Actions = {
  setToken: (token: string) => void
  setProfile: (profile: User) => void
  logout: () => void
}

export type User = {
  _id: number
  name: string
  role: number
  iat: number
  exp: number
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

export type InvoiceDetails = {
  clientId: number
  products: {
    productId: number
    quantity: number
    unitPrice: number
  }[]
}

export type newClientType = {
  identification_type: number
  identification: string
  social_reason: string
  state: string
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    error: boolean
    setError: React.Dispatch<React.SetStateAction<boolean>>
    editedRows: Record<number, boolean>
    setEditedRows: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
    revertData: (rowIndex: number, revert: boolean) => void
    addRow: (id: number) => void
    removeRow: (rowIndex: number) => void
    removeSelectedRows: (selectedRows: number[]) => void
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    type?: string
    editable?: boolean | false
  }
}

export type ProductTableProps = {
  tableData: Invoice[]
  setTableData: React.Dispatch<
    React.SetStateAction<
      {
        id_product: number
        name: string
        quantity: number
        unitPrice: number
        total: number
      }[]
    >
  >
}
export type ClientSearchProps = {
  setIdData: React.Dispatch<React.SetStateAction<Client[]>>
  setTableData?: React.Dispatch<React.SetStateAction<Invoice[]>>
}

export type FooterCellProps = {
  table: Table<Invoice>
}

export type EditCellProps = {
  row: Row<Invoice>
  table: Table<Invoice>
}

export type ProductErrorProps = {
  id?: string
  message?: string
}

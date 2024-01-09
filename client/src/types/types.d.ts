/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef, Row } from '@tanstack/react-table'
import { RowData, Table } from '@tanstack/react-table'

export type State = {
  token: string
  profile: Profile | null
  isAuth: boolean
}

export type Actions = {
  setToken: (token: string) => void
  setProfile: (profile: Profile) => void
  logout: () => void
}

export type Profile = {
  _id: number
  name: string
  role: number
  iat: number
  exp: number
}

export type User = {
  name: string
  middle_name: string | null
  user: string
  id_profile: number
  id_user?: number
  password?: string
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

export interface ItemTableProps {
  data: Product[] | Client[] | User[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any, any>[]
}

export interface ToggleSectionProps {
  title: string
  icon: string
  children: React.ReactNode
}

export interface FormField {
  name: string
  placeholder: string
  type: string
  options?: { value: string; label: string }[]
  notRequired?: boolean
}

export interface GenericFormProps {
  fields: FormField[]
  onSubmit: (formData: Record<string, string>) => Promise<void>
  notRequired?: boolean
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
export type UpdateClientsProps = {
  identificationTypes: Identification[]
}

export type RegisterClientProps = {
  identificationTypes: Identification[]
}

export type ClientSearchProps = {
  setIdData: React.Dispatch<React.SetStateAction<Client[]>>
  setTableData?: React.Dispatch<React.SetStateAction<Invoice[]>>
  identificationTypes: Identification[]
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

import { FooterCellProps } from '../../types/types'

export const FooterCell = ({ table }: FooterCellProps) => {
  const meta = table.options.meta

  const selectedRows = table.getSelectedRowModel().rows
  const removeRows = () => {
    meta?.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row) => row.index)
    )
    table.resetRowSelection()
  }

  return (
    <div>
      {selectedRows.length > 0 ? (
        <button className="remove-button" onClick={removeRows}>
          Remove Selected x
        </button>
      ) : null}
      <button onClick={meta?.addRow}>Add new product +</button>
    </div>
  )
}

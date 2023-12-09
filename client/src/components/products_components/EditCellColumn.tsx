import { Row, Table } from '@tanstack/react-table'
import { Invoice } from '../../types/types'

type EditCellProps = {
  row: Row<Invoice>
  table: Table<Invoice>
}

const EditCell = ({ row, table }: EditCellProps) => {
  const meta = table.options.meta
  const rowId = Number(row.id)

  const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name
    meta?.setEditedRows((old: Record<number, boolean>) => ({
      ...old,
      [row.id]: !old[rowId],
    }))

    if (elName !== 'edit') {
      meta?.revertData(row.index, e.currentTarget.name === 'cancel')
    }
  }

  return (
    <div className="edit-cell-container">
      {meta?.editedRows[rowId] ? (
        <div className="edit-cell">
          <button onClick={setEditedRows} name="cancel">
            X
          </button>
          <button onClick={setEditedRows} name="done">
            ✔
          </button>
        </div>
      ) : (
        <button onClick={setEditedRows} name="edit">
          ✐
        </button>
      )}
    </div>
  )
}

export default EditCell

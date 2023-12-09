import { EditCellProps } from '../../types/types'

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
            <i className="bi bi-x-circle"></i>
          </button>
          <button onClick={setEditedRows} name="done">
            <i className="bi bi-check-circle"></i>{' '}
          </button>
        </div>
      ) : (
        <button onClick={setEditedRows} name="edit">
          <i className="bi bi-pencil"></i>
        </button>
      )}
    </div>
  )
}

export default EditCell

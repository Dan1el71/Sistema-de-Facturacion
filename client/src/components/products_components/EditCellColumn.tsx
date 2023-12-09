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

  const removeRow = () => {
    meta?.removeRow(row.index)
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
        <div>
          <button onClick={setEditedRows} name="edit">
            <i className="bi bi-pencil"></i>
          </button>
          <button onClick={removeRow} name="remove">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )}
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    </div>
  )
}

export default EditCell

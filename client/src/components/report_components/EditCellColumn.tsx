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
    <div className="flex gap-4 justify-center w-full">
      {meta?.editedRows[rowId] ? (
        <div className="flex gap-5">
          <button
            className="bg-green-400 rounded-full px-1"
            onClick={setEditedRows}
            name="done"
          >
            <i className="bi bi-check-circle"></i>{' '}
          </button>
          <button
            className="bg-red-400 rounded-full px-1"
            onClick={setEditedRows}
            name="cancel"
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
      ) : (
        <div className="flex gap-5 ">
          <button
            className="bg-green-400 rounded-full px-1"
            onClick={setEditedRows}
            name="edit"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="bg-red-400 rounded-full px-1"
            onClick={removeRow}
            name="remove"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )}
      <input
        id={`select-${row.id}`}
        className="w-4 h-4 self-center"
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    </div>
  )
}

export default EditCell

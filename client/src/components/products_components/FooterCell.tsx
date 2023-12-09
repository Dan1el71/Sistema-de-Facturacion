import { FooterCellProps } from '../../types/types'

export const FooterCell = ({ table }: FooterCellProps) => {
  const meta = table.options.meta

  return (
    <div>
      <button onClick={meta?.addRow}>Add new product +</button>
    </div>
  )
}

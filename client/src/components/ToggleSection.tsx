import { useState } from 'react'
import { ToggleSectionProps } from '../types/types'

const ToggleSection = ({ title, icon, children }: ToggleSectionProps) => {
  const [modal, setModal] = useState(false)

  return (
    <div className="mx-12 my-4">
      <div
        onClick={() => setModal(!modal)}
        className="flex cursor-pointer w-fit"
      >
        <i className={`${icon} pr-4`} />
        <h2>{title}</h2>
        <button className="px-2">
          {modal ? (
            <i className="bi bi-caret-up-fill" />
          ) : (
            <i className="bi bi-caret-down-fill" />
          )}
        </button>
      </div>
      {modal && children}
    </div>
  )
}
export default ToggleSection

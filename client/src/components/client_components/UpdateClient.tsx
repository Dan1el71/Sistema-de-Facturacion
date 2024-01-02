import { Client, UpdateClientsProps } from '../../types/types'
import ClientSearch from './ClientSearch'
import { useState } from 'react'

const UpdateClient = ({ identificationTypes }: UpdateClientsProps) => {
  const [idData, setIdData] = useState<Client[]>([])
  const [modal, setModal] = useState(false)

  return (
    <>
      <div className="my-4 mx-12">
        <div
          className="flex w-auto cursor-pointer"
          onClick={() => setModal(!modal)}
        >
          <i className="pr-2 bi bi-person-plus" />
          <h2>Modificar cliente</h2>
          <button className="px-2">
            {modal ? (
              <i className="bi bi-caret-up-fill" />
            ) : (
              <i className="bi bi-caret-down-fill" />
            )}
          </button>
        </div>
        {modal && (
          <>
            <ClientSearch
              identificationTypes={identificationTypes}
              setIdData={setIdData}
            />
            <div>
              {Object.keys(idData).length > 0 && (
                <div>
                  <h1>hola</h1>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default UpdateClient

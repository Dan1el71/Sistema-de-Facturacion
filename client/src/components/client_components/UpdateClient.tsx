import { Client, UpdateClientsProps } from '../../types/types'
import ClientSearch from './ClientSearch'
import { useState } from 'react'

const UpdateClient = ({ identificationTypes }: UpdateClientsProps) => {
  const [idData, setIdData] = useState<Client[]>([])

  return (
    <>
      <div className="my-6 mx-12">
        <h2>
          <i className="pr-2 bi bi-person-plus" />
          Modificar cliente
        </h2>
        <ClientSearch
          identificationTypes={identificationTypes}
          setIdData={setIdData}
        />
      </div>

      {Object.keys(idData).length > 0 && <div className=""></div>}
    </>
  )
}
export default UpdateClient

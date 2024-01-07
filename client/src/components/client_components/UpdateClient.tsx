import { Client, UpdateClientsProps } from '../../types/types'
import ClientSearch from './ClientSearch'
import { useState } from 'react'

const UpdateClient = ({ identificationTypes }: UpdateClientsProps) => {
  const [idData, setIdData] = useState<Client[]>([])

  return (
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
  )
}
export default UpdateClient

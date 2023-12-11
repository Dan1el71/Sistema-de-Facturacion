import { Client } from '../../types/types'
import ClientSearch from './ClientSearch'
import { useState } from 'react'

const UpdateClient = () => {
  const [idData, setIdData] = useState<Client[]>([])

  return (
    <>
      <div className="my-6 mx-12">
        <h2>
          <i className="pr-2 bi bi-person-plus" />
          Modificar cliente
        </h2>
      </div>
      <ClientSearch
        title="Digite el cliente a modificar"
        setIdData={setIdData}
      />

      {Object.keys(idData).length > 0 && <div className=""></div>}
    </>
  )
}
export default UpdateClient

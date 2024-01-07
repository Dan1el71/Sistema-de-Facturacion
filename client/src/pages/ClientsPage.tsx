import { useEffect, useState } from 'react'

import { Client, Identification } from '../types/types'
import { getIdTypes } from '../api/client'
import { useAuthStore } from '../store/auth'
import ClientSearch from '../components/client_components/ClientSearch'
import RegisterClient from '../components/client_components/RegisterClient'
import UpdateClient from '../components/client_components/UpdateClient'
import ItemInfoTable from '../components/ItemTable'
import { createColumnHelper } from '@tanstack/react-table'
import ToggleSection from '../components/ToggleSection'

const columnHelper = createColumnHelper<Client>()

const columns = [
  columnHelper.accessor('client', {
    cell: (info) => info.getValue(),
    header: 'Cliente',
  }),
  columnHelper.accessor('identification_type', {
    cell: (info) => info.getValue(),
    header: 'Tipo de identificación',
  }),
  columnHelper.accessor('identification', {
    cell: (info) => info.getValue(),
    header: 'Identificación',
  }),
  columnHelper.accessor('social_reason', {
    cell: (info) => info.getValue(),
    header: 'Razón social',
  }),
  columnHelper.accessor('register_date', {
    cell: (info) => info.getValue(),
    header: 'Fecha de registro',
  }),
  columnHelper.accessor('state', {
    cell: (info) => info.getValue(),
    header: 'Estado',
  }),
]

const ClientsPage = () => {
  const [idData, setIdData] = useState<Client[]>([])
  const role = useAuthStore((state) => state.profile?.role)
  const [identificationTypes, setIdentificationTypes] = useState<
    Identification[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getIdTypes()
        setIdentificationTypes(types.data.idTypes)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Clientes</h1>
      </div>

      <div id="Consultar">
        <ToggleSection title="Consultar cliente" icon="pr-2 bi bi-search">
          <>
            <ClientSearch
              identificationTypes={identificationTypes}
              setIdData={setIdData}
            />
            {Object.keys(idData).length > 0 && (
              <ItemInfoTable data={idData} columns={columns} />
            )}
          </>
        </ToggleSection>
      </div>

      {role === 1 && (
        <div>
          <div id="Registrar" className="flex">
            <ToggleSection
              title="Registrar cliente"
              icon="pr-2 bi bi-person-plus"
            >
              <RegisterClient identificationTypes={identificationTypes} />
            </ToggleSection>
          </div>
          <div id="Modificar">
            <ToggleSection title="Modificar cliente" icon="bi bi-pencil">
              <UpdateClient identificationTypes={identificationTypes} />
            </ToggleSection>
          </div>
        </div>
      )}
    </div>
  )
}
export default ClientsPage

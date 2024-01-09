import { useEffect, useState } from 'react'
import ToggleSection from '../components/ToggleSection'
import RegisterUser from '../components/users_components/RegisterUser'
import UserSearch from '../components/users_components/UserSearch'
import { getProfiles } from '../api/user'

const UsersPage = () => {
  const [profile, setProfile] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profiles = await getProfiles()
        setProfile(profiles.data.profiles)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Usuarios</h1>
      </div>
      <div id="Consultar">
        <ToggleSection title="Consultar usuario" icon="bi bi-search">
          <UserSearch />
        </ToggleSection>{' '}
      </div>
      <div id="Registrar">
        <ToggleSection title="Registrar usuario" icon="bi bi-person-plus">
          <RegisterUser profile={profile} />
        </ToggleSection>
      </div>
      <div id="Modificar"></div>
    </div>
  )
}
export default UsersPage

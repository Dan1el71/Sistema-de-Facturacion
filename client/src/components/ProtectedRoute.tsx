import { Navigate, Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import { useAuthStore } from '../store/auth'

interface Props {
  isAllowed: boolean
  children?: React.ReactNode
  role: number
}

export const ProtectedRoute = ({ isAllowed, children, role }: Props) => {
  const userRole = useAuthStore((state) => state.profile?.id_profile || 3)

  if (!isAllowed) return <Navigate to="/login" />
  if (role < userRole) return <Navigate to="/" />

  return (
    <>
      <SideBar />
      {children ? children : <Outlet />}
    </>
  )
}

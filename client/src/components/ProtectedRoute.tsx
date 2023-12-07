import { Navigate, Outlet } from 'react-router-dom'
import SideBar from './SideBar'

interface Props {
  isAllowed: boolean
  children?: React.ReactNode
}

export const ProtectedRoute = ({ isAllowed, children }: Props) => {
  if (!isAllowed) return <Navigate to="/login" />

  return (
    <>
      <SideBar />
      {children ? children : <Outlet />}
    </>
  )
}

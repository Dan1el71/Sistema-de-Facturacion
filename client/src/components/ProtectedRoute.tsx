import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { useAuthStore } from '../store/auth'
import { getUserProfile } from '../api/auth'

interface Props {
  isAllowed: boolean
  children?: React.ReactNode
  requiredRole: number
}

export const ProtectedRoute = ({
  isAllowed,
  children,
  requiredRole,
}: Props) => {
  const navigate = useNavigate()
  const userProfile = useAuthStore((state) => state.profile)
  const setUserProfile = useAuthStore((state) => state.setProfile)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await getUserProfile()
        setUserProfile(data.profile)
      } catch (err) {
        navigate('/login')
      }
    }

    loadProfile()
  }, [navigate, setUserProfile])

  if (!isAllowed) return <Navigate to="/login" />
  if (userProfile?.role && requiredRole < userProfile.role)
    return <Navigate to="/" />

  return (
    <>
      <SideBar />
      {children || <Outlet />}
    </>
  )
}

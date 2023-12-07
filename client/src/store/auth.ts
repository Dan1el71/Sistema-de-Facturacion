import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  token: string
  profile: User | null
  isAuth: boolean
}

type User = {
  id_user: number
  name: string
  middle_name: string | null
  user: string
  id_profile: number
}

type Actions = {
  setToken: (token: string) => void
  setProfile: (profile: User) => void
  logout: () => void
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: '',
      profile: null,
      isAuth: false,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: true,
        })),
      setProfile: (profile: User) =>
        set(() => ({
          profile,
        })),
      logout: () =>
        set(() => ({
          token: '',
          isAuth: false,
          profile: null,
        })),
    }),
    {
      name: 'auth',
    }
  )
)

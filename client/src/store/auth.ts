import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  token: string
  profile: object | null
  isAuth: boolean
}

type Actions = {
  setToken: (token: string) => void
  setProfile: (profile: object) => void
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
      setProfile: (profile: object) =>
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

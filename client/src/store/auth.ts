import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Actions, State, Profile } from '../types/types'

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
      setProfile: (profile: Profile) =>
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

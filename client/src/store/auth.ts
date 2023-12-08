import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Actions, State, User } from '../types/types'

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: '',
      profile: null,
      isAuth: false,
      role: '',
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: true,
        })),
      setProfile: (profile: User) =>
        set(() => ({
          profile,
        })),
      setRole: (role: string) =>
        set(() => ({
          role,
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

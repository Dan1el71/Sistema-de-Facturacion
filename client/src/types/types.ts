export type State = {
  token: string
  profile: User | null
  isAuth: boolean
  role: string
}

export type Actions = {
  setToken: (token: string) => void
  setProfile: (profile: User) => void
  setRole: (role: string) => void
  logout: () => void
}

export type User = {
  id_user: number
  name: string
  middle_name: string | null
  user: string
  id_profile: number
}

export type Identification = {
  identification_type: number
  abreviature: string
  description: string
}

export type Client = {
  client: number
  identification: string
  identification_type: string
  register_date: string
  social_reason: string
  state: string
}

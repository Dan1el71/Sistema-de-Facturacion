import axios from '../libs/axios'
import { User } from '../types/types'

export const getUserById = async (id: number) => {
  return axios.get('/user/' + id)
}

export const newUser = async (data: User) => {
  const { name, middle_name, user, password, id_profile } = data
  return axios.post('/user', {
    name,
    middle_name: middle_name || undefined,
    user,
    password,
    id_profile,
  })
}

export const getProfiles = async () => {
  return axios.get('/profile')
}

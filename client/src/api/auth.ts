import axios from '../libs/axios'

export const login = async (user: string, password: string) => {
  return axios.post('/auth/login', {
    user,
    password,
  })
}

export const getProfileName = async (id: number) => {
  return axios.get('/profile/getProfile/' + id)
}


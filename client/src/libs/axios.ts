import axios, { AxiosRequestHeaders } from 'axios'
import { useAuthStore } from '../store/auth'

const authApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  config.headers = {
    Authorization: `Bearer ${token}`,
  } as AxiosRequestHeaders
  return config
})

authApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default authApi

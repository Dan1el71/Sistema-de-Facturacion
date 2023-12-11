import axios from '../libs/axios'
import { newClientType } from '../types/types'

export const getIdTypes = async () => {
  return axios.get('/idtypes/getIdType')
}

export const getClientById = async (idType: number, id: number) => {
  return axios.get('/client/getClientById/' + idType + '/' + id)
}

export const newClient = async (data: newClientType) => {
  return axios.post('/client/newClient', data)
}

import axios from '../libs/axios'

export const getIdTypes = async () => {
  return axios.get('/idtypes/getIdType')
}

export const getClientById = async (idType: number, id: number) => {
  return axios.get('/client/getClientById/' + idType + '/' + id)
}

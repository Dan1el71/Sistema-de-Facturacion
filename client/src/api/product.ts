import axios from '../libs/axios'

export const getProductById = async (id: number) => {
  return axios.get('/product/getProduct/' + id)
}

import axios from '../libs/axios'
import { InvoiceDetails } from '../types/types'

export const getProductById = async (id: number) => {
  return axios.get('/product/' + id)
}

export const newInvoiceDetails = async (data: InvoiceDetails) => {
  return axios.post('/invoice/', data)
}

export const newProduct = async (data: {
  name: string
  state: string
  unit_price: number
}) => {
  return axios.post('/product/', data)
}

export const updateProduct = async (
  id: number,
  data: {
    name: string
    state: string
    unit_price: number
  }
) => {
  return axios.put('/product/' + id, data)
}

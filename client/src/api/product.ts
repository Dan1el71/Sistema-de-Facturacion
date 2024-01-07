import axios from '../libs/axios'
import { InvoiceDetails, Product } from '../types/types'

export const getProductById = async (id: number) => {
  return axios.get('/product/' + id)
}

export const newInvoiceDetails = async (data: InvoiceDetails) => {
  return axios.post('/invoice/', data)
}

export const newProduct = async (data: Product) => {
  return axios.post('/product/', data)
}

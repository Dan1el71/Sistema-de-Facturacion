import { Router } from 'express'
import { requireAuth } from '../middlewares/requireAuth'
import { validateSchema } from '../middlewares/validateSchema'
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schemas/product.schema'
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from '../controllers/product.controller'

const route = Router()

route.post(
  '/newProduct',
  requireAuth,
  validateSchema(createProductSchema),
  createProduct
)

route.get(
  '/getProduct',
  requireAuth,
  validateSchema(getProductSchema),
  getProduct
)
route.get(
  '/getProduct/:id',
  requireAuth,
  validateSchema(getProductSchema),
  getProduct
)

route.put(
  '/updateProduct/:id',
  requireAuth,
  validateSchema(updateProductSchema),
  updateProduct
)

route.delete(
  '/deleteProduct/:id',
  requireAuth,
  validateSchema(deleteProductSchema),
  deleteProduct
)

export default route

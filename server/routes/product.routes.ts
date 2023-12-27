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
  getAllProducts,
  updateProduct,
} from '../controllers/product.controller'

const route = Router()

route.get('/', requireAuth, getAllProducts)

route.get('/:id', requireAuth, validateSchema(getProductSchema), getProduct)

route.post(
  '/',
  requireAuth,
  validateSchema(createProductSchema),
  createProduct
)

route.put(
  '/:id',
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

import { Router } from 'express'
import { requireAuth } from '../middlewares/requireAuth'
import { validateSchema } from '../middlewares/validateSchema'
import { newInvoiceSchema } from '../schemas/invoice.schema'
import { newInvoice } from '../controllers/invoice.controller'

const route = Router()

route.post(
  '/newInvoice',
  requireAuth,
  validateSchema(newInvoiceSchema),
  newInvoice
)

export default route

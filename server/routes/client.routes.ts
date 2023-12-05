import { Router } from 'express'
import { requireAuth } from '../middlewares/requireAuth'
import { validateSchema } from '../middlewares/validateSchema'
import {
  deleteClientSchema,
  getClientByIdSchema,
  getClientSchema,
  newClientSchema,
  updateClientSchema,
} from '../schemas/client.schema'
import {
  deleteClient,
  getClient,
  getClientById,
  newClient,
  updateClient,
} from '../controllers/client.controller'

const route = Router()

//Get
route.get('/getClient', requireAuth, validateSchema(getClientSchema), getClient)
route.get(
  '/getClient/:id',
  requireAuth,
  validateSchema(getClientSchema),
  getClient
)
route.get(
  '/getClientById/:id',
  requireAuth,
  validateSchema(getClientByIdSchema),
  getClientById
)

//Post
route.post(
  '/newClient',
  requireAuth,
  validateSchema(newClientSchema),
  newClient
)

route.put(
  '/updateClient/:id',
  requireAuth,
  validateSchema(updateClientSchema),
  updateClient
)

route.delete(
  '/deleteClient/:id',
  requireAuth,
  validateSchema(deleteClientSchema),
  deleteClient
)

export default route

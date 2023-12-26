import { Router } from 'express'
import { requireAuth } from '../middlewares/requireAuth'
import { validateSchema } from '../middlewares/validateSchema'
import {
  deleteClientSchema,
  getClientByIdSchema,
  createClientSchema,
  updateClientSchema,
} from '../schemas/client.schema'
import {
  deleteClient,
  getAllClients,
  getClient,
  getClientById,
  createClient,
  updateClient,
} from '../controllers/client.controller'

const route = Router()

//Get
route.get('/', requireAuth, getAllClients)
route.get('/:id', requireAuth, getClient)

route.get(
  '/:idType/:id',
  requireAuth,
  validateSchema(getClientByIdSchema),
  getClientById
)

//Post
route.post('/', requireAuth, validateSchema(createClientSchema), createClient)

//Put
route.put('/:id', requireAuth, validateSchema(updateClientSchema), updateClient)

//Delete
route.delete(
  '/:id',
  requireAuth,
  validateSchema(deleteClientSchema),
  deleteClient
)

export default route

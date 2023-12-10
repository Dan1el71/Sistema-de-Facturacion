import { Router } from 'express'
import { requireAuth } from '../middlewares/requireAuth'
import {
  deleteUser,
  getUser,
  newUser,
  updateUser,
} from '../controllers/user.controller'
import { validateSchema } from '../middlewares/validateSchema'
import {
  deleteUserSchema,
  getUserSchema,
  newUserSchema,
  updateUserSchema,
} from '../schemas/auth.schema'

const route = Router()

route.post('/newUser', validateSchema(newUserSchema), newUser)

route.get('/getUser', requireAuth, getUser)
route.get('/getUser/:id', requireAuth, validateSchema(getUserSchema), getUser)

route.put(
  '/updateUser/:id',
  requireAuth,
  validateSchema(updateUserSchema),
  updateUser
)

route.delete(
  '/deleteUser/:id',
  requireAuth,
  validateSchema(deleteUserSchema),
  deleteUser
)

export default route

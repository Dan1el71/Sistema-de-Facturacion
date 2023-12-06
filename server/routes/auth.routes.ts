import { Router } from 'express'
import {
  deleteUser,
  getUser,
  loginHandler,
  newUser,
  updateUser,
} from '../controllers/auth.controller'
import { validateSchema } from '../middlewares/validateSchema'
import {
  deleteUserSchema,
  getUserSchema,
  loginHandlerSchema,
  newUserSchema,
  updateUserSchema,
} from '../schemas/auth.schema'
import { requireAuth } from '../middlewares/requireAuth'

const route = Router()

route.post('/newUser', validateSchema(newUserSchema), newUser)
route.post('/login', validateSchema(loginHandlerSchema), loginHandler)

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

import { Router } from 'express'
import { requireAuth } from '../middlewares/requireAuth'
import {
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
  createUser,
} from '../controllers/user.controller'
import { validateSchema } from '../middlewares/validateSchema'
import {
  deleteUserSchema,
  getUserSchema,
  newUserSchema,
  updateUserSchema,
} from '../schemas/user.schema'

const route = Router()

route.get('/', requireAuth, getAllUsers)
route.get('/:id', requireAuth, validateSchema(getUserSchema), getUser)

route.post('/', validateSchema(newUserSchema), createUser)

route.put('/:id', requireAuth, validateSchema(updateUserSchema), updateUser)

route.delete(
  '/:id',
  requireAuth,
  validateSchema(deleteUserSchema),
  deleteUser
)

export default route

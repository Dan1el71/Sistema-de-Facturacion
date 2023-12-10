import { Router } from 'express'
import { getUserProfile, loginHandler } from '../controllers/auth.controller'
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

route.post('/login', validateSchema(loginHandlerSchema), loginHandler)

route.get('/getUserProfile', requireAuth, getUserProfile)



export default route

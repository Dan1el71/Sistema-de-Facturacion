import { Router } from 'express'
import { getUser, loginHandler, newUser } from '../controllers/auth.controller'
import { validateSchema } from '../middlewares/validateSchema'
import {
  getUserSchema,
  loginHandlerSchema,
  newUserSchema,
} from '../schemas/auth.schema'
import { requireAuth } from '../middlewares/requireAuth'

const route = Router()

route.post('/newUser', validateSchema(newUserSchema), newUser)
route.post('/login', validateSchema(loginHandlerSchema), loginHandler)

route.get('/getUser', requireAuth, getUser)
route.get('/getUser/:id', requireAuth, validateSchema(getUserSchema), getUser)

export default route

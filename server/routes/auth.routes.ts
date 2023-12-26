import { Router } from 'express'
import { loginHandler, profileHandler } from '../controllers/auth.controller'
import { validateSchema } from '../middlewares/validateSchema'
import { loginHandlerSchema } from '../schemas/auth.schema'
import { requireAuth } from '../middlewares/requireAuth'

const route = Router()

route.post('/login', validateSchema(loginHandlerSchema), loginHandler)

route.get('/profile', requireAuth, profileHandler)

export default route

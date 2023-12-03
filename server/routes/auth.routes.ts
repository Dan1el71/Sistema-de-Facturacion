import { Router } from 'express'
import { signUpHandler } from '../controllers/auth.controller'

const route = Router()

route.post('/newUser', signUpHandler)

export default route

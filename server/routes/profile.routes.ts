import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema'
import { getProfileSchema, newProfileSchema } from '../schemas/profile.schema'
import { getProfile, newProfile } from '../controllers/profile.controller'

const route = Router()

route.post('/newProfile', validateSchema(newProfileSchema), newProfile)

route.get('/getProfile/:id', validateSchema(getProfileSchema), getProfile)

export default route

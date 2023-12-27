import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema'
import { getProfileSchema, newProfileSchema } from '../schemas/profile.schema'
import { getProfile, newProfile } from '../controllers/profile.controller'

const route = Router()

route.post('/', validateSchema(newProfileSchema), newProfile)

route.get('/:id', validateSchema(getProfileSchema), getProfile)

export default route

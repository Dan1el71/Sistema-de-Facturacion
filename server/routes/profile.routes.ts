import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema'
import { getProfileSchema, newProfileSchema } from '../schemas/profile.schema'
import { getAllProfiles, getProfile, newProfile } from '../controllers/profile.controller'

const route = Router()

route.post('/', validateSchema(newProfileSchema), newProfile)

route.get('/', getAllProfiles)
route.get('/:id', validateSchema(getProfileSchema), getProfile)

export default route

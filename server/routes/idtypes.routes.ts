import { Router } from 'express'
import { getIdType, newIdType } from '../controllers/idtype.controller'
import { getIdTypeSchema, newIdTypeSchema } from '../schemas/idtype.schema'
import { validateSchema } from '../middlewares/validateSchema'

const route = Router()

route.post('/newIdType', validateSchema(newIdTypeSchema), newIdType)

route.get('/getIdType', validateSchema(getIdTypeSchema), getIdType)
route.get('/getIdType/:id', validateSchema(getIdTypeSchema), getIdType)

export default route

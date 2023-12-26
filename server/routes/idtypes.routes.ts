import { Router } from 'express'
import {
  getIdType,
  createIdType,
  getIdTypes,
} from '../controllers/idtype.controller'
import { getIdTypeSchema, newIdTypeSchema } from '../schemas/idtype.schema'
import { validateSchema } from '../middlewares/validateSchema'

const route = Router()

route.post('/', validateSchema(newIdTypeSchema), createIdType)

route.get('/', getIdTypes)
route.get('/:id', validateSchema(getIdTypeSchema), getIdType)

export default route

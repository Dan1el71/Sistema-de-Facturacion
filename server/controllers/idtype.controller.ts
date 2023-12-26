import { Request, Response } from 'express'
import {
  GetIdTypeSchemaType,
  NewIdTypeSchemaType,
} from '../schemas/idtype.schema'
import prisma from '../db'
import { handleError } from '../middlewares/errorHandler'

export const createIdType = async (
  req: Request<any, any, NewIdTypeSchemaType>,
  res: Response
) => {
  try {
    const { abreviature, description } = req.body

    if (await abreviatureExist(res, abreviature))
      return res.status(400).json({
        message: 'Identification type already exists',
      })

    const newIdType = await prisma.identification_Type.create({
      data: {
        abreviature,
        description,
      },
    })

    if (newIdType)
      return res.status(201).json({
        identification_type: newIdType,
      })

    return res.status(400).json({
      message: 'Identification type not created',
    })
  } catch (err) {
    return handleError(res, err)
  }
}

const abreviatureExist = async (res: Response, abreviature: string) => {
  const idTypeExist = await prisma.identification_Type.findFirst({
    where: {
      abreviature,
    },
  })

  return idTypeExist
}

export const getIdTypes = async (req: Request, res: Response) => {
  try {
    const idTypes = await prisma.identification_Type.findMany()

    return res.status(200).json({
      idTypes,
    })
  } catch (err) {
    return handleError(res, err)
  }
}

export const getIdType = async (
  req: Request<GetIdTypeSchemaType>,
  res: Response
) => {
  try {
    const { id } = req.params

    const identification_type = parseInt(id)

    const idType = await prisma.identification_Type.findFirst({
      where: {
        identification_type,
      },
    })

    if (idType) {
      return res.status(200).json({
        identification_type: idType,
      })
    }

    return res.status(400).json({
      message: 'Identification type not found',
    })
  } catch (err) {
    return handleError(res, err)
  }
}

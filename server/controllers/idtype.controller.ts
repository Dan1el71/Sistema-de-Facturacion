import { Request, Response } from 'express'
import {
  GetIdTypeSchemaType,
  NewIdTypeSchemaType,
} from '../schemas/idtype.schema'
import prisma from '../db'

export const newIdType = async (
  req: Request<any, any, NewIdTypeSchemaType>,
  res: Response
) => {
  const { abreviature, description } = req.body

  const idTypeExist = await prisma.identification_Type.findFirst({
    where: {
      abreviature,
    },
  })

  if (idTypeExist) {
    return res.status(400).json({
      status: 'failed',
      message: 'Id type already exists',
    })
  }

  const newIdType = await prisma.identification_Type.create({
    data: {
      abreviature,
      description,
    },
  })

  if (newIdType)
    return res.status(201).json({
      status: 'success',
      data: {
        newIdType,
      },
    })

  return res.status(400).json({
    status: 'failed',
    message: 'Failed to create new id type',
  })
}

export const getIdType = async (
  req: Request<GetIdTypeSchemaType>,
  res: Response
) => {
  try {
    const { id } = req.params

    if (id) {
      const identification_type = parseInt(id)

      if (!isNaN(identification_type)) {
        const idType = await prisma.identification_Type.findFirst({
          where: {
            identification_type,
          },
        })

        if (idType) {
          return res.status(200).json({
            status: 'success',
            data: {
              idType,
            },
          })
        }
      }

      return res.status(400).json({
        status: 'failed',
        message: 'Invalid idType id',
      })
    }

    const idTypes = await prisma.identification_Type.findMany()

    return res.status(200).json({
      status: 'success',
      data: {
        idTypes,
      },
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid idType id',
      error: err,
    })
  }
}

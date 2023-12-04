import { Request, Response } from 'express'
import {
  getProfileSchemaType,
  newProfileSchemaType,
} from '../schemas/profile.schema'
import prisma from '../db'

export const newProfile = async (
  req: Request<any, any, newProfileSchemaType>,
  res: Response
) => {
  const name = req.body.name

  const profileExist = await prisma.profile.findFirst({
    where: {
      name,
    },
  })
  if (profileExist) {
    return res.status(400).json({
      status: 'failed',
      message: 'Profile already exists',
    })
  }

  const newProfile = await prisma.profile.create({
    data: {
      name,
    },
  })

  if (newProfile)
    return res.status(201).json({
      status: 'success',
      data: {
        newProfile,
      },
    })

  return res.status(400).json({
    status: 'failed',
    message: 'Failed to create new profile',
  })
}

export const getProfile = async (
  req: Request<getProfileSchemaType, any, any>,
  res: Response
) => {
  try {
    const id_profile = parseInt(req.params.id)

    const profile = await prisma.profile.findFirst({
      where: {
        id_profile,
      },
    })

    if (profile)
      return res.status(200).json({ status: 'success', data: { profile } })

    return res.status(400).json({
      status: 'failed',
      message: 'Profile id not found',
    })
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid profile id',
    })
  }
}

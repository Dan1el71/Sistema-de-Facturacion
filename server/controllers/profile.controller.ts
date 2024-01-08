import { Request, Response } from 'express'
import {
  getProfileSchemaType,
  newProfileSchemaType,
} from '../schemas/profile.schema'
import prisma from '../db'
import {
  alreadyExistsError,
  handleError,
  notFoundError,
} from '../middlewares/errorHandler'

export const newProfile = async (
  req: Request<any, any, newProfileSchemaType>,
  res: Response
) => {
  try {
    const name = req.body.name

    if (await profileExist(name)) return alreadyExistsError(res, 'Profile')

    const newProfile = await prisma.profile.create({
      data: {
        name,
      },
    })

    if (newProfile)
      return res.status(201).json({
        profile: newProfile,
      })
    else throw new Error('Profile creation failed')
  } catch (err) {
    handleError(res, err)
  }
}

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany()

    return res.status(200).json({
      profiles,
    })
  } catch (err) {
    handleError(res, err)
  }
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
      return res.status(200).json({
        profile,
      })

    return notFoundError(res, 'Profile')
  } catch (err) {
    handleError(res, err)
  }
}

const profileExist = async (name: string) => {
  const profile = await prisma.profile.findFirst({
    where: {
      name,
    },
  })

  return profile
}

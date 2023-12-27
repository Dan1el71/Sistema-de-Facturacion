import {
  deleteUserSchemaType,
  getUserSchemaType,
  updateUserSchemaType,
} from './../schemas/user.schema'
import { Request, Response } from 'express'

import prisma from '../db'
import { newUserSchemaType } from '../schemas/user.schema'
import {
  alreadyExistsError,
  handleError,
  notFoundError,
} from '../middlewares/errorHandler'

export const createUser = async (
  req: Request<any, any, newUserSchemaType>,
  res: Response
) => {
  try {
    const { name, middle_name, password, user, id_profile } = req.body

    if (await findUser(undefined, user)) return alreadyExistsError(res, 'User')

    const newUser = await prisma.user.createUser(
      name,
      user,
      password,
      id_profile,
      middle_name ? middle_name : undefined
    )

    if (newUser) {
      const { id_user, name, middle_name, user, id_profile } = newUser

      return res.status(201).json({
        user: {
          id_user,
          name,
          middle_name,
          user,
          id_profile,
        },
      })
    }

    return res.status(400).json({
      message: 'Invalid profile id',
    })
  } catch (err) {
    handleError(res, err)
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id_user: true,
        name: true,
        middle_name: true,
        user: true,
        id_profile: true,
      },
    })

    return res.status(200).json({
      users,
    })
  } catch (err) {
    return handleError(res, err)
  }
}

export const getUser = async (
  req: Request<getUserSchemaType, any, any>,
  res: Response
) => {
  try {
    const id_user = parseInt(req.params.id)

    const user = await findUser(id_user)

    if (user)
      return res.status(200).json({
        user,
      })

    return notFoundError(res, 'User')
  } catch (err) {
    return handleError(res, err)
  }
}

export const updateUser = async (
  req: Request<updateUserSchemaType>,
  res: Response
) => {
  try {
    const id_user = parseInt(req.params.id)
    const { name, middle_name, user, password, id_profile } = req.body

    if (!(await findUser(id_user))) return notFoundError(res, 'User')

    const userExist = await findUser(undefined, user)

    if (userExist && userExist.id_user !== id_user)
      return alreadyExistsError(res, 'User')

    const updatedUser = await prisma.user.updateUser(
      id_user,
      name,
      user,
      password,
      id_profile,
      middle_name ? middle_name : undefined
    )

    if (updatedUser) {
      return res.status(200).json({
        user: updatedUser,
      })
    }

    return res.status(400).json({
      message: 'Invalid profile id',
    })
  } catch (err) {
    handleError(res, err)
  }
}

export const deleteUser = async (
  req: Request<deleteUserSchemaType, any, any>,
  res: Response
) => {
  try {
    const id_user = parseInt(req.params.id)

    if (!(await findUser(id_user))) return notFoundError(res, 'User')

    const deletedUser = await prisma.user.delete({
      where: {
        id_user,
      },
    })

    if (deletedUser)
      return res.status(200).json({
        user: deletedUser,
      })

    return res.status(400).json({
      message: 'User delete failed',
    })
  } catch (err) {
    handleError(res, err)
  }
}

const findUser = async (id_user?: number, user?: string) => {
  const userFound = await prisma.user.findFirst({
    where: {
      id_user,
      user,
    },
    select: {
      id_user: true,
      name: true,
      middle_name: true,
      user: true,
      id_profile: true,
    },
  })

  return userFound
}

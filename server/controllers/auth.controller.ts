import { Request, Response } from 'express'
import {
  getUserSchemaType,
  loginHandlerSchemaType,
  newUserSchemaType,
} from '../schemas/auth.schema'
import prisma from '../db'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config'

export const newUser = async (
  req: Request<any, any, newUserSchemaType>,
  res: Response
) => {
  const { name, middle_name, password, user, id_profile } = req.body

  const userExist = await prisma.user.findFirst({
    where: {
      user,
    },
  })

  if (userExist) {
    return res.status(400).json({
      status: 'failed',
      message: 'User already exists',
    })
  }

  const newUser = await prisma.user.createUser(
    name,
    user,
    password,
    id_profile,
    middle_name ? middle_name : undefined
  )

  if (newUser) {
    const { id_user, name, middle_name, user, id_profile } = newUser

    const token = jwt.sign({ _id: id_user }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    return res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id_user,
          name,
          middle_name,
          user,
          id_profile,
        },
      },
    })
  }

  return res.status(400).json({
    status: 'failed',
    message: 'Invalid profile',
  })
}

export const loginHandler = async (
  req: Request<any, any, loginHandlerSchemaType>,
  res: Response
) => {
  const { user, password } = req.body

  const userFound = await prisma.user.findFirst({
    where: {
      user,
    },
  })

  if (!userFound) {
    return res.status(400).json({
      status: 'failed',
      message: 'Authentication failed',
    })
  }

  const { id_user, name, middle_name, id_profile } = userFound

  const validPassword = await prisma.user.validPassword(
    password,
    userFound.password
  )
  if (!validPassword) {
    return res.status(400).json({
      status: 'failed',
      message: 'Authentication failed',
    })
  }

  const token = jwt.sign({ _id: id_user }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })

  return res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id_user,
        name,
        middle_name,
        user,
        id_profile,
      },
    },
  })
}

export const getUser = async (
  req: Request<getUserSchemaType, any, any>,
  res: Response
) => {
  try {
    const id_user = parseInt(req.params.id) || req.user.id

    const user = await prisma.user.findFirst({
      where: {
        id_user,
      },
      select: {
        id_user: true,
        name: true,
        middle_name: true,
        user: true,
        id_profile: true,
      },
    })

    if (user)
      return res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      })

    return res.status(400).json({ status: 'failed', message: 'User not found' })
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid user',
    })
  }
}

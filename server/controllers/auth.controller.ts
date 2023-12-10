import { Request, Response } from 'express'
import { loginHandlerSchemaType } from '../schemas/auth.schema'
import prisma from '../db'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config'

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

  const token = jwt.sign({ _id: id_user, role: id_profile }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id_user,
      name,
      middle_name,
      user,
      id_profile,
    },
  })
}

export const getUserProfile = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    userProfile: req.user,
  })
}

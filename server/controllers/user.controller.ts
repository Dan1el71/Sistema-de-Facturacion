import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { deleteUserSchemaType, getUserSchemaType, newUserSchemaType, updateUserSchemaType } from '../schemas/auth.schema'
import prisma from '../db'
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

    const token = jwt.sign({ _id: id_user, role: id_profile }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    return res.status(201).json({
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

  return res.status(400).json({
    status: 'failed',
    message: 'Invalid profile id',
  })
}

export const getUser = async (
  req: Request<getUserSchemaType, any, any>,
  res: Response
) => {
  try {
    const id = req.params.id
    if (id) {
      const id_user = parseInt(id)

      const userFound = await prisma.user.findFirst({
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
      if (userFound)
        return res.status(200).json({
          status: 'success',
          userFound,
        })

      return res.status(400).json({
        status: 'failed',
        message: 'User not found',
      })
    }

    const users = await prisma.user.findMany({
      select: {
        id_user: true,
        name: true,
        middle_name: true,
        user: true,
        id_profile: true,
      },
    })

    if (users)
      return res.status(200).json({
        status: 'success',
        users,
      })

    return res
      .status(400)
      .json({ status: 'failed', message: 'Users not found' })
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid user',
    })
  }
}


export const updateUser = async (
  req: Request<updateUserSchemaType>,
  res: Response
) => {
  try {
    const id_user = parseInt(req.params.id)
    const { name, middle_name, user, password, id_profile } = req.body

    const userFound = await prisma.user.findFirst({
      where: {
        id_user,
      },
    })

    if (!userFound) {
      return res.status(400).json({
        status: 'failed',
        message: 'User not found',
      })
    }

    const userExist = await prisma.user.findFirst({
      where: {
        user,
      },
    })

    if (userExist && userExist.id_user !== id_user) {
      return res.status(400).json({
        status: 'failed',
        message: 'User already exists',
      })
    }

    const updatedUser = await prisma.user.updateUser(
      id_user,
      name,
      user,
      password,
      id_profile,
      middle_name ? middle_name : undefined
    )

    if (updatedUser)
      return res.status(200).json({
        status: 'success',
        updatedUser,
      })

    return res.status(400).json({
      status: 'failed',
      message: 'Invalid profile id',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

export const deleteUser = async (
  req: Request<deleteUserSchemaType, any, any>,
  res: Response
) => {
  try {
    const id_user = parseInt(req.params.id)

    const userFound = await prisma.user.findFirst({
      where: {
        id_user,
      },
    })

    if (!userFound) {
      return res.status(400).json({
        status: 'failed',
        message: 'User not found',
      })
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id_user,
      },
    })

    if (deletedUser)
      return res.status(200).json({
        status: 'success',
        deletedUser,
      })

    return res.status(400).json({
      status: 'failed',
      message: 'User delete failed',
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

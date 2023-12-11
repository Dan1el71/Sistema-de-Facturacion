import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        message: 'Unauthorized',
      })

    req.user = user as Express.Request['user']
    next()
  })
}

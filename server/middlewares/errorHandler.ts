import { Response } from 'express'

export const handleError = (res: Response, err: unknown) => {
  console.log(err)
  res.status(500).json({
    message: 'Internal server error',
  })
}

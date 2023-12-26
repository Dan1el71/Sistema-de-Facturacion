import { Response } from 'express'

export const handleError = (res: Response, err: unknown) => {
  console.log(err)
  res.status(500).json({
    message: 'Internal server error',
  })
}

export const clientNotFound = (res: Response) => {
  res.status(404).json({
    message: 'Client not found',
  })
}
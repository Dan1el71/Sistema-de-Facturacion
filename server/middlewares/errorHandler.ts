import { Response } from 'express'

export const handleError = (res: Response, err: unknown) => {
  console.log(err)
  res.status(500).json({
    message: 'Internal server error',
  })
}

export const notFoundError = (res: Response, message: string) => {
  res.status(404).json({
    message: `${message} not found`,
  })
}

export const alreadyExistsError = (res: Response, message: string) => {
  res.status(400).json({
    message: `${message} already exists`,
  })
}

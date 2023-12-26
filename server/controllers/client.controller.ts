import { Request, Response } from 'express'
import {
  deleteClientSchemaType,
  getClientByIdSchemaType,
  createClientSchemaType,
  updateClientSchemaType,
} from '../schemas/client.schema'
import prisma from '../db'
import { clientNotFound, handleError } from '../middlewares/errorHandler'

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany()

    return res.status(200).json({
      clients,
    })
  } catch (err) {
    handleError(res, err)
  }
}

export const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const client = parseInt(id)
    if (!isNaN(client)) {
      const clientFound = await prisma.client.findFirst({
        where: {
          client,
        },
      })
      if (clientFound) {
        return res.status(200).json({
          client: clientFound,
        })
      }
    }

    return clientNotFound(res)
  } catch (err) {
    handleError(res, err)
  }
}

export const getClientById = async (
  req: Request<getClientByIdSchemaType>,
  res: Response
) => {
  try {
    const identification = req.params.id
    const identification_type = parseInt(req.params.idType)

    const client = await prisma.client.findFirst({
      where: {
        identification_type,
        identification,
      },
    })
    if (client) {
      return res.status(200).json({
        client,
      })
    }

    return clientNotFound(res)
  } catch (err) {
    handleError(res, err)
  }
}

export const createClient = async (
  req: Request<any, any, createClientSchemaType>,
  res: Response
) => {
  try {
    const { identification, identification_type, social_reason, state } =
      req.body

    const client = await clientExists(identification)

    if (client) {
      return res.status(400).json({
        message: 'Client already exists',
      })
    }

    const newClient = await prisma.client.createClient(
      identification_type,
      identification,
      social_reason,
      state
    )

    if (newClient) {
      return res.status(200).json({
        client: newClient,
      })
    }

    return res.status(400).json({
      message: 'Client not created',
    })
  } catch (err) {
    handleError(res, err)
  }
}

export const updateClient = async (
  req: Request<updateClientSchemaType>,
  res: Response
) => {
  try {
    const { identification, identification_type, social_reason, state } =
      req.body

    const client = parseInt(req.params.id)

    const identificationExists = await clientExists(identification)

    if (identificationExists && identificationExists.client !== client) {
      return res.status(400).json({
        message: 'Client already exists',
      })
    }

    const updatedClient = await prisma.client.update({
      where: {
        client,
      },
      data: {
        identification_type,
        identification,
        social_reason,
        state,
      },
    })

    if (updatedClient) {
      return res.status(200).json({
        client: updatedClient,
      })
    }

    return clientNotFound(res)
  } catch (err) {
    return handleError(res, err)
  }
}

export const deleteClient = async (
  req: Request<deleteClientSchemaType, any, any>,
  res: Response
) => {
  try {
    const client = parseInt(req.params.id)

    const validClient = await clientExists(undefined, client)

    if (validClient) {
      const deletedClient = await prisma.client.delete({
        where: {
          client,
        },
      })

      return res.status(200).json({
        client: deletedClient,
      })
    }
    return clientNotFound(res)
  } catch (err) {
    return handleError(res, err)
  }
}

const clientExists = async (identification?: string, client?: number) => {
  const clientFound = await prisma.client.findFirst({
    where: {
      client,
      identification,
    },
  })
  if (clientFound) {
    return clientFound
  }

  return false
}

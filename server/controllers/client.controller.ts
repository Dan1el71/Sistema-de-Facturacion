import { Request, Response } from 'express'
import {
  deleteClientSchemaType,
  getClientByIdSchemaType,
  getClientSchemaType,
  newClientSchemaType,
  updateClientSchemaType,
} from '../schemas/client.schema'
import prisma from '../db'

export const getClient = async (
  req: Request<getClientSchemaType>,
  res: Response
) => {
  try {
    const { id } = req.params

    if (id) {
      const client = parseInt(id)
      if (!isNaN(client)) {
        const clientFound = await prisma.client.findFirst({
          where: {
            client,
          },
        })
        if (clientFound) {
          return res.status(200).json({
            status: 'success',
            data: {
              clientFound,
            },
          })
        }
        return res.status(400).json({
          status: 'failed',
          message: 'Client not found',
        })
      }
    }

    const clients = await prisma.client.findMany()

    return res.status(200).json({
      status: 'success',
      data: {
        clients,
      },
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

export const getClientById = async (
  req: Request<getClientByIdSchemaType>,
  res: Response
) => {
  try {
    const identification = req.params.id
    const identification_type = parseInt(req.params.idType)

    const clientFound = await prisma.client.findFirst({
      where: {
        identification_type,
        identification,
      },
    })
    if (clientFound) {
      return res.status(200).json({
        status: 'success',
        data: {
          clientFound,
        },
      })
    }

    return res.status(400).json({
      status: 'failed',
      message: 'Client not found',
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

export const newClient = async (
  req: Request<any, any, newClientSchemaType>,
  res: Response
) => {
  try {
    const { identification, identification_type, social_reason, state } =
      req.body

    const clientFound = await prisma.client.findFirst({
      where: {
        identification,
      },
    })

    if (clientFound) {
      return res.status(400).json({
        status: 'failed',
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
        status: 'success',
        data: {
          newClient,
        },
      })
    }

    return res.status(400).json({
      status: 'failed',
      message: 'Client not created',
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
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
    const idType = parseInt(req.params.idType)

    const validClient = await prisma.client.findFirst({
      where: {
        identification_type: idType,
        client,
      },
    })

    if (validClient) {
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
          status: 'success',
          data: {
            updatedClient,
          },
        })
      }
    }

    return res.status(400).json({
      status: 'failed',
      message: 'Client not found',
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

export const deleteClient = async (
  req: Request<deleteClientSchemaType, any, any>,
  res: Response
) => {
  try {
    const client = parseInt(req.params.id)
    const identification_type = parseInt(req.params.idType)

    const validClient = await prisma.client.findFirst({
      where: {
        identification_type,
        client,
      },
    })
    if (validClient) {
      const deletedClient = await prisma.client.delete({
        where: {
          client,
        },
      })

      if (deletedClient) {
        return res.status(200).json({
          status: 'success',
          data: {
            deletedClient,
          },
        })
      }
    }
    return res.status(400).json({
      status: 'failed',
      message: 'Client not found',
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

import { Request, Response } from 'express'
import { NewInvoiceSchemaType } from '../schemas/invoice.schema'
import prisma from '../db'

export const newInvoice = async (
  req: Request<any, any, NewInvoiceSchemaType>,
  res: Response
) => {
  try {
    const { clientId, products } = req.body

    const validClient = await prisma.client.findFirst({
      where: {
        client: clientId,
      },
    })
    if (!validClient) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid client id',
      })
    }

    const newInvoice = await prisma.invoice.create({
      data: {
        client: clientId,
      },
    })

    const invoiceDetails = products.map((product) => {
      return {
        consecutive: newInvoice.consecutive,
        id_product: product.productId,
        quantity: product.quantity,
        unit_price: product.unitPrice,
      }
    })

    await prisma.invoiceDetails.createMany({
      data: invoiceDetails,
    })

    res.status(201).json({
      status: 'success',
      message: 'Invoice created successfully',
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

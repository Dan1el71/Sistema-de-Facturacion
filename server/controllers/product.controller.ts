import { Request, Response } from 'express'
import {
  createProductSchemaType,
  deleteProductSchemaType,
  getProductSchemaType,
  updateProductSchemaType,
} from '../schemas/product.schema'
import prisma from '../db'

export const createProduct = async (
  req: Request<any, any, createProductSchemaType>,
  res: Response
) => {
  try {
    const { name, state, unit_price } = req.body

    const productExist = await prisma.products.findFirst({
      where: {
        name,
      },
    })

    if (productExist) {
      return res.status(400).json({
        status: 'failed',
        message: 'Product already exists',
      })
    }

    const newProduct = await prisma.products.create({
      data: {
        name,
        state,
        unit_price,
      },
    })

    if (newProduct) {
      return res.status(201).json({
        status: 'success',
        message: 'Product created successfully',
        newProduct,
      })
    } else {
      throw new Error('Product creation failed')
    }
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

export const getProduct = async (
  req: Request<getProductSchemaType>,
  res: Response
) => {
  try {
    const _id = req.params.id

    if (_id) {
      const id = parseInt(_id)
      const productFound = await prisma.products.findFirst({
        where: {
          id,
        },
      })

      if (productFound) {
        return res.status(200).json({
          status: 'success',
          productFound,
        })
      }

      return res.status(400).json({
        status: 'failed',
        message: 'Product not found',
      })
    }

    const products = await prisma.products.findMany()

    return res.status(200).json({
      status: 'success',
      products,
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

export const updateProduct = async (
  req: Request<updateProductSchemaType>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id)
    const { name, state, unit_price } = req.body

    const productFound = await prisma.products.findFirst({
      where: {
        id,
      },
    })

    if (!productFound) {
      return res.status(400).json({
        status: 'failed',
        message: 'Product not found',
      })
    }

    const productExists = await prisma.products.findFirst({
      where: {
        name,
      },
    })

    if (productExists && productExists.id !== id) {
      return res.status(400).json({
        status: 'failed',
        message: 'Product already exists',
      })
    }

    const updatedProduct = await prisma.products.update({
      where: {
        id,
      },
      data: {
        name,
        state,
        unit_price,
      },
    })

    if (updatedProduct) {
      return res.status(200).json({
        status: 'success',
        updatedProduct,
      })
    } else {
      throw new Error('Product update failed')
    }
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

export const deleteProduct = async (
  req: Request<deleteProductSchemaType, any, any>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id)

    const productFound = await prisma.products.findFirst({
      where: {
        id,
      },
    })

    if (!productFound) {
      return res.status(400).json({
        status: 'failed',
        message: 'Product not found',
      })
    }

    const deletedProduct = await prisma.products.delete({
      where: {
        id,
      },
    })

    if (deletedProduct) {
      return res.status(200).json({
        status: 'success',
        deletedProduct,
      })
    } else {
      throw new Error('Product deletion failed')
    }
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    })
  }
}

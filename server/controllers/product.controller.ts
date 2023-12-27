import { Request, Response } from 'express'
import {
  createProductSchemaType,
  deleteProductSchemaType,
  getProductSchemaType,
  updateProductSchemaType,
} from '../schemas/product.schema'
import prisma from '../db'
import {
  alreadyExistsError,
  handleError,
  notFoundError,
} from '../middlewares/errorHandler'

export const createProduct = async (
  req: Request<any, any, createProductSchemaType>,
  res: Response
) => {
  try {
    const { name, state, unit_price } = req.body

    if (await findProduct(undefined, name))
      return alreadyExistsError(res, 'Product')

    const newProduct = await prisma.product.create({
      data: {
        name,
        state,
        unit_price,
      },
    })

    if (newProduct) {
      return res.status(201).json({
        product: newProduct,
      })
    } else {
      throw new Error('Product creation failed')
    }
  } catch (error) {
    return handleError(res, error)
  }
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany()

    if (products) {
      return res.status(200).json({
        products,
      })
    } else {
      throw new Error('Product retrieval failed')
    }
  } catch (err) {
    handleError(res, err)
  }
}

export const getProduct = async (
  req: Request<getProductSchemaType>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id)

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    })

    if (product) {
      return res.status(200).json({
        product,
      })
    }

    return notFoundError(res, 'Product')
  } catch (err) {
    handleError(res, err)
  }
}

export const updateProduct = async (
  req: Request<updateProductSchemaType>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id)
    const { name, state, unit_price } = req.body

    if (!(await findProduct(id, undefined)))
      return notFoundError(res, 'Product')

    const productExists = await findProduct(undefined, name)

    if (productExists && productExists.id !== id) {
      return alreadyExistsError(res, 'Product')
    }

    const updatedProduct = await prisma.product.update({
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
        product: updatedProduct,
      })
    } else {
      throw new Error('Product update failed')
    }
  } catch (err) {
    handleError(res, err)
  }
}

export const deleteProduct = async (
  req: Request<deleteProductSchemaType, any, any>,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id)

    if (!(await findProduct(id, undefined)))
      return notFoundError(res, 'Product')

    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    })

    if (deletedProduct) {
      return res.status(200).json({
        deletedProduct,
      })
    } else {
      throw new Error('Product deletion failed')
    }
  } catch (err) {
    return handleError(res, err)
  }
}

const findProduct = async (id?: number, name?: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id,
      name,
    },
  })

  return product
}

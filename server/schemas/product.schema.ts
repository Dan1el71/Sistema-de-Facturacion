import { z } from 'zod'

export const getProductSchema = z.object({
  params: z
    .object({
      id: z
        .string({ required_error: 'Product id is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Id must be a number',
        })
        .optional(),
    })
    .strict(),
  body: z.object({}).strict(),
})

export const createProductSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'Product name is required' })
        .min(1)
        .max(100),
      state: z
        .string({ required_error: 'Product state is required' })
        .min(1)
        .max(45),
      unit_price: z.number({
        required_error: 'Product unit price is required',
      }),
    })
    .strict(),
})

export const updateProductSchema = z.object({
  params: z
    .object({
      id: z
        .string({ required_error: 'Product id is required' })
        .min(1)
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'ID must be a number',
        }),
    })
    .strict(),
  body: z
    .object({
      name: z.string().min(1).max(100),
      state: z.string().min(1).max(45),
      unit_price: z.number(),
    })
    .strict(),
})

export const deleteProductSchema = z.object({
  params: z
    .object({
      id: z
        .string({ required_error: 'Product id is required' })
        .min(1)
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'ID must be a number',
        }),
    })
    .strict(),
  body: z.object({}).strict(),
})

export type getProductSchemaType = z.infer<typeof getProductSchema>['params']
export type createProductSchemaType = z.infer<
  typeof createProductSchema
>['body']
export type updateProductSchemaType = z.infer<
  typeof updateProductSchema
>['params']
export type deleteProductSchemaType = z.infer<
  typeof deleteProductSchema
>['params']

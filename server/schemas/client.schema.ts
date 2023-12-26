import { z } from 'zod'

export const getClientByIdSchema = z.object({
  params: z
    .object({
      id: z
        .string({ required_error: 'Client id is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Client id must be a number',
        }),
      idType: z
        .string({ required_error: 'Identification type is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Identification type must be a number',
        }),
    })
    .strict(),
  body: z.object({}).strict(),
})

export const createClientSchema = z.object({
  body: z
    .object({
      identification_type: z.number({
        required_error: 'Identification type is required',
      }),
      identification: z
        .string({ required_error: 'Identification is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Id must be a number',
        }),
      social_reason: z
        .string({ required_error: 'Social reason is required' })
        .min(1)
        .max(100),
      state: z
        .string({ required_error: 'Id is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Id must be a number',
        }),
    })
    .strict(),
})

export const updateClientSchema = z.object({
  params: z
    .object({
      id: z
        .string({ required_error: 'Id is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Id must be a number',
        }),
    })
    .strict(),
  body: z
    .object({
      identification_type: z.number({
        required_error: 'Identification type is required',
      }),
      identification: z
        .string({ required_error: 'Identification is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Id must be a number',
        }),
      social_reason: z
        .string({ required_error: 'Social reason is required' })
        .min(1)
        .max(100),
      state: z
        .string({ required_error: 'Id is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Id must be a number',
        }),
    })
    .strict(),
})

export const deleteClientSchema = z.object({
  params: z
    .object({
      id: z
        .string({ required_error: 'Id is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Id must be a number',
        }),
    })
    .strict(),
  body: z.object({}).strict(),
})

export type getClientByIdSchemaType = z.infer<
  typeof getClientByIdSchema
>['params']
export type createClientSchemaType = z.infer<typeof createClientSchema>['body']
export type deleteClientSchemaType = z.infer<
  typeof deleteClientSchema
>['params']
export type updateClientSchemaType = z.infer<
  typeof updateClientSchema
>['params']

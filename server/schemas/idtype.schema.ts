import { z } from 'zod'

export const newIdTypeSchema = z.object({
  body: z
    .object({
      abreviature: z
        .string({ required_error: 'Abreviature is required' })
        .min(1)
        .max(3),
      description: z.string().min(1).max(100).optional(),
    })
    .strict({ message: 'Invalid data' }),
})

export const getIdTypeSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'Id is required' })
      .refine((val) => !isNaN(parseInt(val)), {
        message: 'Id must be a number',
      })
      .optional(),
  }),
  body: z.object({}).strict({ message: 'Invalid data' }),
})

export type GetIdTypeSchemaType = z.infer<typeof getIdTypeSchema>['params']
export type NewIdTypeSchemaType = z.infer<typeof newIdTypeSchema>['body']

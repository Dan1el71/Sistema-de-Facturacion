import { z } from 'zod'

export const newProfileSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'Name is required' }).min(2).max(13),
    })
    .strict(),
})

export const getProfileSchema = z.object({
  params: z
    .object({
      id: z.string({ required_error: 'Id is required' }),
    })
    .strict(),
})

export type newProfileSchemaType = z.infer<typeof newProfileSchema>['body']
export type getProfileSchemaType = z.infer<typeof getProfileSchema>['params']

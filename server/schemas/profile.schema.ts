import { z } from 'zod'

export const newProfileSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'Profile name is required' })
        .min(2)
        .max(13),
    })
    .strict(),
})

export const getProfileSchema = z.object({
  params: z
    .object({
      id: z
        .string({ required_error: 'Profile id is required' })
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'Profile id must be a number',
        }),
    })
    .strict(),
})

export type newProfileSchemaType = z.infer<typeof newProfileSchema>['body']
export type getProfileSchemaType = z.infer<typeof getProfileSchema>['params']

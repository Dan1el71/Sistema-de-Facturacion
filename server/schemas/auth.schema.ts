import { z } from 'zod'

export const newUserSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(45),
      middle_name: z.string().min(4).max(45).optional(),
      user: z
        .string()
        .min(4, { message: 'Username must be at least 4 characters long' })
        .max(45),
      password: z
        .string({ required_error: 'Password is required' })
        .min(5, { message: 'Password must be at least 5 characters long' })
        .max(45),
      id_profile: z.number().int().positive(),
    })
    .strict(),
})

export const loginHandlerSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'Username is required' }).min(1).max(45),
    password: z
      .string({ required_error: 'Password is required' })
      .min(3)
      .max(45),
  }),
})
export const getUserSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'ID is required' }).min(1),
  }),
})

export type newUserSchemaType = z.infer<typeof newUserSchema>['body']
export type loginHandlerSchemaType = z.infer<typeof loginHandlerSchema>['body']
export type getUserSchemaType = z.infer<typeof getUserSchema>['params']

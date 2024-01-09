import { z } from 'zod'

export const newUserSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(45),
      middle_name: z
        .string()
        .min(4, { message: 'Middle name must be at least 4 characters long' })
        .max(45)
        .optional(),
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

export const getUserSchema = z.object({
  params: z
    .object({
      id: z
        .string({ required_error: 'User id is required' })
        .min(1)
        .refine((val) => !isNaN(parseInt(val)), {
          message: 'User id must be a number',
        }),
    })
    .strict(),
})

export const updateUserSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'ID is required' })
      .min(1)
      .refine((val) => !isNaN(parseInt(val)), {
        message: 'ID must be a number',
      }),
  }),
  body: z.object({
    name: z.string().min(2).max(45),
    middle_name: z.string().min(4).max(45).optional(),
    user: z.string().min(4).max(45),
    password: z.string().min(5).max(45),
    id_profile: z.number().int().positive(),
  }),
})

export const deleteUserSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'ID is required' })
      .min(1)
      .refine((val) => !isNaN(parseInt(val)), {
        message: 'ID must be a number',
      }),
  }),
})

export type deleteUserSchemaType = z.infer<typeof deleteUserSchema>['params']
export type updateUserSchemaType = z.infer<typeof updateUserSchema>['params']
export type newUserSchemaType = z.infer<typeof newUserSchema>['body']
export type getUserSchemaType = z.infer<typeof getUserSchema>['params']

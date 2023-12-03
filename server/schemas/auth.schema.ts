import { z } from 'zod'

export const signUpSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' }),
  }),
})

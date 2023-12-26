import { z } from 'zod'

export const loginHandlerSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'Username is required' }).min(1).max(45),
    password: z
      .string({ required_error: 'Password is required' })
      .min(3)
      .max(45),
  }),
})

export type loginHandlerSchemaType = z.infer<typeof loginHandlerSchema>['body']

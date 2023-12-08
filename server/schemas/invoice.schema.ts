import { z } from 'zod'

export const newInvoiceSchema = z.object({
  body: z
    .object({
      clientId: z.number({ required_error: 'Client id is required' }),
      products: z.array(
        z.object({
          productId: z.number({ required_error: 'Product id is required' }),
          quantity: z.number({ required_error: 'Quantity is required' }),
          unitPrice: z.number({ required_error: 'Unit price is required' }),
        })
      ),
    })
    .strict(),
})

export type NewInvoiceSchemaType = z.infer<typeof newInvoiceSchema>['body']

import { config } from 'dotenv'

config()

export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

const origin = process.env.ORIGIN || 'http://localhost:5173'
export const PORT = process.env.PORT || 3000

export const corsOptions = {
  origin: [origin],
  credentials: true,
}

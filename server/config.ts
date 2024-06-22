import { config } from 'dotenv'

config()

export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

export const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN
export const TURSO_DATABASE_URL =
  process.env.TURSO_DATABASE_URL || 'http://localhost:5173'

const origin = process.env.ORIGIN || 'http://localhost:5173'
export const PORT = process.env.PORT || 3000

export const corsOptions = {
  origin: [origin],
  credentials: true,
}

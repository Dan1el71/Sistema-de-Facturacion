import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { corsOptions } from './config'
import authRoutes from './routes/auth.routes'

const app = express()

//Middelwares
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)

export default app

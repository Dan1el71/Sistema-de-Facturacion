import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { corsOptions } from './config'
import authRoutes from './routes/auth.routes'
import profileRoutes from './routes/profile.routes'
import idTypeRoutes from './routes/idtypes.routes'
import clientRoutes from './routes/client.routes'

const app = express()

//Middelwares
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/idtypes', idTypeRoutes)
app.use('/api/client', clientRoutes)

export default app

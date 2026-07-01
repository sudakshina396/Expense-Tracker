import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import { connectMongo } from './config/mongo'
import transactionRoutes from './routes/transactionRoutes'

const app = express()

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true })
})

app.use('/api/transactions', transactionRoutes)

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

async function start() {
  await connectMongo()

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`)
  })
}

start().catch((err) => {
  console.error('Failed to start server', err)
  process.exit(1)
})


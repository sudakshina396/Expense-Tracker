import mongoose from 'mongoose'
import { env } from './env'

export async function connectMongo() {
  const uri = env.MONGODB_URI
  if (!uri) throw new Error('Missing MONGODB_URI')

  mongoose.set('strictQuery', true)

  await mongoose.connect(uri)
  console.log('MongoDB connected')
}


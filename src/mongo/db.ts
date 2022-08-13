import mongoose from 'mongoose'
import { ConnectOptions } from 'mongodb'

const MONGODB_URI: string = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error(
    'Please provide correct MongoDB connection string in your .env.local(.local) file'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {} as ConnectOptions

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      mongoose.set('toJSON', { virtuals: true })
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

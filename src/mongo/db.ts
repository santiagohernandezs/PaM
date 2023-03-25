import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const MONGO_URI: string = process.env.MONGO_URI ?? ''

export const connectDB = async ():Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI)
    
  } catch (e: any) {
    console.error(`Error: ${e.message}`)
    process.exit(1)
  }
}

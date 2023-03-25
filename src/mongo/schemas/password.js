import { model, Schema } from 'mongoose'

const passwordSchema = new Schema({
  provider: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
})

export default model('password', passwordSchema)

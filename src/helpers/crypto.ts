import { compare, genSalt, hash } from 'bcrypt'

const salt = await genSalt(14)

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, salt)
}

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash)
}

export { hashPassword, comparePassword }

import { Password, PrismaClient } from '@prisma/client'
import type {
  Create,
  DeleteOne,
  FindByCredentials,
  Update
} from '../types/controllers.types.ts'
const prisma = new PrismaClient()

const findByCredentials = async (args: FindByCredentials) => {
  return await prisma.password.findFirst(args)
}

const create = async (args: Create): Promise<Password> => {
  return await prisma.password.create(args)
}

const update = async (args: Update): Promise<Password> => {
  return await prisma.password.update(args)
}

const findMany = async (): Promise<Password[]> => {
  return await prisma.password.findMany()
}

const count = async (): Promise<number> => {
  return await prisma.password.count()
}

const deleteOne = async (args: DeleteOne) => {
  return await prisma.password.delete(args)
}

export { findByCredentials, update, create, findMany, count, deleteOne }

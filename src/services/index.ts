import { Password } from '@prisma/client'
import {
  count,
  create,
  deleteOne,
  findByCredentials,
  findMany,
  update
} from '../controllers/index.ts'
import type {
  CreatePassword,
  DeleteOne,
  FindByCredentials,
  Update
} from '../types/services.types.ts'

const createPassword = async (args: CreatePassword): Promise<Password> => {
  return create({
    data: {
      ...args
    }
  })
}

const listPasswords = async (): Promise<Password[]> => {
  return findMany()
}

const countPasswords = async (): Promise<number> => {
  return count()
}

const findPassword = async (args: FindByCredentials) => {
  return await findByCredentials({
    where: {
      ...args
    }
  })
}

const deletePassword = async (args: DeleteOne): Promise<Password> => {
  const password = await findByCredentials({
    where: {
      ...args
    }
  })

  return await deleteOne({
    where: {
      id: password?.id
    }
  })
}

const updatePassword = async (args: Update): Promise<Password> => {
  const password = await findByCredentials({
    where: {
      provider: args.provider,
      username: args.username
    }
  })

  return await update({
    where: {
      id: password?.id
    },
    data: {
      ...args
    }
  })
}

export {
  createPassword,
  listPasswords,
  countPasswords,
  findPassword,
  deletePassword,
  updatePassword
}

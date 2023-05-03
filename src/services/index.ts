import { Password } from '@prisma/client'
import {
  count,
  create,
  deleteOne,
  findByCredentials,
  findMany,
  update
} from '../controllers/index.ts'
import { comparePassword, hashPassword } from '../helpers/crypto.ts'
import type {
  CreatePassword,
  DeleteOne,
  FindByCredentials,
  Update
} from '../types/services.types.ts'

const createPassword = async (args: CreatePassword): Promise<Password> => {
  return create({
    data: {
      provider: args.provider,
      username: args.username,
      password: await hashPassword(args.password)
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
  const user = await findByCredentials({
    where: {
      provider: args.provider,
      username: args.username
    }
  })

  if (!user) throw new Error('User not found')

  const equalPasswords = await comparePassword(args.oldPassword, user.password)
  console.debug(args.newPassword, equalPasswords)
  if (equalPasswords) {
    if (args.oldPassword === args.newPassword)
      throw new Error('The new password must be different from the old one')

    return await update({
      where: {
        id: user?.id
      },
      data: {
        password: await hashPassword(args.newPassword)
      }
    })
  } else {
    throw new Error('Passwords do not match')
  }
}

export {
  createPassword,
  listPasswords,
  countPasswords,
  findPassword,
  deletePassword,
  updatePassword
}


import { Prisma } from '@prisma/client'

type Update = {
  where: Prisma.PasswordWhereUniqueInput
  data: Prisma.PasswordUpdateInput
}

type Create = {
  data: Prisma.PasswordCreateInput
  select?: Prisma.PasswordSelect | undefined
}

type FindByCredentials = {
  where: Prisma.PasswordWhereInput
}

type DeleteOne = {
  where: Prisma.PasswordWhereUniqueInput
}

export type { Update, Create, FindByCredentials, DeleteOne }

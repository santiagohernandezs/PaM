type CreatePassword = {
  provider: string
  username: string
  password: string
}

type FindByCredentials = {
  provider: string
  username: string
}

type Update = {
  provider: string
  username: string
  password: string
}

type DeleteOne = {
  provider: string
  username: string
}

export { CreatePassword, FindByCredentials, DeleteOne, Update }

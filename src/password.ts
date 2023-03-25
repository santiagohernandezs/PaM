import mongoose from 'mongoose'
import { connectDB } from './mongo/db.js'
import passwordSchema from './mongo/schemas/password.js'

export async function setPassword(provider:string, name:string, password:string):Promise<void> {
  try {
    await connectDB()

    const currentPassword = { provider, name, password }
    const passwords: passwordSchema = new passwordSchema(currentPassword)
    await passwords.save()

    await mongoose.connection.close()
  } catch (e:any) {
    console.error(`Error: ${e.message}`)
  }
}

export async function getPassword(providerName:string, userName:string):Promise<string | undefined> {
  try {
    await connectDB()

    const password = await passwordSchema.find({
      provider: providerName,
      name: userName
    })

    await mongoose.connection.close()
    return password ? password.at(0).password : 'No se encontró la contraseña'
  } catch (e:any) {
    console.error(`Error: ${e.message}`)
    await mongoose.connection.close()
    process.exit(1)

  }
}

export async function countPasswords()  :Promise<string | undefined> {
  try {
    await connectDB()

    const count = await passwordSchema.countDocuments()

    await mongoose.connection.close()
    return `Tienes ${count} contraseñas guardadas.`
  } catch (e:any) {
    console.error(`Error: ${e.message}`)
    await mongoose.connection.close()
    process.exit(1)
  }
}

export async function deletePassword(providerName:string, userName:string):Promise<string | undefined> {
  try {
    await connectDB()
    const password = await passwordSchema.deleteOne({provider: providerName, name: userName})
    await mongoose.connection.close()
    
    return password ? 'password.at(0).password' : 'No se encontró la contraseña'
  } catch (e:any) {
    console.error(`Error: ${e.message}`)
    await mongoose.connection.close()
    process.exit(1)
  }
}

export async function listPasswords():Promise<string| string[] | undefined> {

  try {
    await connectDB()
    const passwords = await passwordSchema.find()
    const passwordsList = [...passwords].map(password => {
      return(`Proveedor: ${password.provider} - Nombre de usuario: ${password.name} - Contraseña: ${password.password}`);
    })
    await mongoose.connection.close()
    return passwordsList.length !== 0 ? passwordsList : 'No hay contraseñas guardadas'
  } catch (e:any) {
    console.log(`Error: ${e.message}`);
    await mongoose.connection.close()
    process.exit(1)
    
  }

}

export async function editPassword(providerName:string, userName:string, newPassword:string):Promise<string | undefined> {
  try {
    await connectDB()
    const oldpassword = await passwordSchema.findOneAndUpdate({provider: providerName, name: userName}, {password: newPassword})
    return oldpassword ? 'La contraseña ha sido actualizada' : 'No se encontró la contraseña'
  } catch (e:any) {
    console.log(`Error: ${e.message}`);
    await mongoose.connection.close()
    process.exit(1)
  }
}
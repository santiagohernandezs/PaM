import * as p from '@clack/prompts'
import { intro, outro, select, spinner } from '@clack/prompts'
import color from 'picocolors'
import { setTimeout } from 'timers/promises'
import { options } from './options.js'
import {
  countPasswords,
  deletePassword, editPassword, getPassword,
  listPasswords,
  setPassword
} from './password.js'

console.clear()
intro(`${color.bold(color.cyan('Hola Santiago, bienvenido a Password Manager'))}`)

const menu = await select({
  message: '¿Qué quieres hacer?',
  options: Object.entries(options).map(([key, value]) => ({
    label: value.label,
    value: key,
    hint: value.hint
  }))
})

switch (menu) {
  case 'save':
    while (true) {
      const saveGroup = await p.group(
        {
          providerName: (): Promise<string | symbol> =>
            p.text({
              message: '¿Cuál es el nombre del proveedor?',
              placeholder: 'Twitter, Facebook, etc.',
              validate: value => {
                if (value.length < 1) return 'El nombre no puede estar vacío'
              }
            }),
          userName: (): Promise<string | symbol> =>
            p.text({
              message: '¿Cuál es tu nombre de usuario?',
              placeholder: 'jhonDoe123',
              validate: value => {
                if (value.length < 1) return 'El nombre no puede estar vacío'
              }
            }),
          password: (): Promise<string | symbol> =>
            p.password({
              message: '¿Cuál es tu contraseña?',
              validate: value => {
                if (value.length < 1) return 'El nombre no puede estar vacío'
              }
            }),
          repeatPassword: (): Promise<string | symbol> =>
            p.password({
              message: 'Repite la contraseña',
              validate: value => {
                if (value.length < 1) return 'El nombre no puede estar vacío'
              }
            })
        },
        {
          onCancel: (): never => {
            p.cancel('Operación cancelada.')
            process.exit(0)
          }
        }
      )

      if (saveGroup.password !== saveGroup.repeatPassword) {
        console.log('Las contraseñas no coinciden')
        process.exit(1)
      }

      const savePasswordSpinner = spinner()
      savePasswordSpinner.start('Guardando contraseña')
      await setTimeout(2000)

      const currentPasswords = setPassword(
        saveGroup.providerName,
        saveGroup.userName,
        saveGroup.password
      )
      console.log(currentPasswords)

      savePasswordSpinner.stop('Constraseña guardada')

      let aditionalPassword = await select({
        message: '¿Quieres añadir otra contraseña?',
        options: [
          { label: 'si', value: 'yes' },
          { label: 'no', value: 'no' }
        ]
      })

      if (aditionalPassword === 'no') {
        outro('Hasta luego.')
        process.exit(0)
      }
    }

  case 'view':
    const viewGroup = await p.group(
      {
        providerName: (): Promise<string | symbol> =>
          p.text({
            message: '¿Cuál es el nombre del proveedor?',
            placeholder: 'Twitter, Facebook, etc.'
          }),
        userName: (): Promise<string | symbol> =>
          p.text({ message: '¿Cuál es tu nombre de usurio?', placeholder: 'jhonDoe123' })
      },
      {
        onCancel: (): never => {
          p.cancel('Opreación cancelada.')
          process.exit(0)
        }
      }
    )

    const getPasswordSpinner = spinner()
    getPasswordSpinner.start('Buscando contraseña')
    await setTimeout(2000)
    const password = await getPassword(viewGroup.providerName, viewGroup.userName)
    getPasswordSpinner.stop('Contraseña encontrada')
    console.log(` La contraseña es ${password}`)

    outro('Hasta luego.')
    process.exit(0)

  case 'count':
    const count = await countPasswords()
    console.log(count)
    outro('Hasta luego.')
    process.exit(0)

  case 'list':
    const list = await listPasswords()
    console.log(list)
    outro('Hasta luego.')
    process.exit(0)

  case 'delete':
    const deleteGroup = await p.group(
      {
        providerName: (): Promise<string | symbol> =>
          p.text({
            message: '¿Cuál es el nombre del proveedor?',
            placeholder: 'Twitter, Facebook, etc.'
          }),
        userName: (): Promise<string | symbol> =>
          p.text({ message: '¿Cuál es tu nombre de usurio?', placeholder: 'jhonDoe123' })
      },
      {
        onCancel: (): never => {
          p.cancel('Opreación cancelada.')
          process.exit(0)
        }
      }
    )

    const deletePasswordSpinner = spinner()
    deletePasswordSpinner.start('Eliminando contraseña')
    await setTimeout(2000)
    const deletedPassword = await deletePassword(
      deleteGroup.providerName,
      deleteGroup.userName
    )
    console.log(deletedPassword)

    deletePasswordSpinner.stop('Contraseña eliminada')
    outro('Hasta luego.')
    process.exit(0)

  case 'edit':
    const editGroup = await p.group(
      {
        providerName: (): Promise<string | symbol> =>
          p.text({
            message: '¿Cuál es el nombre del proveedor?',
            placeholder: 'Twitter, Facebook, etc.'
          }),
        userName: (): Promise<string | symbol> =>
          p.text({ message: '¿Cuál es tu nombre de usurio?', placeholder: 'jhonDoe123' }),
        newPassword: (): Promise<string | symbol> => 
          p.password({
            message: '¿Cuál es tu nueva contraseña?',
            validate: value => {
              if (value.length < 1) return 'El nombre no puede estar vacío'
            }
          }),
      },
      {
        onCancel: (): never => {
          p.cancel('Opreación cancelada.')
          process.exit(0)
        }

      })

    const editPasswordSpinner = spinner()
    editPasswordSpinner.start('Editando contraseña')
    await setTimeout(2000)
    
    const editedPassword = await editPassword(
      editGroup.providerName,
      editGroup.userName,
      editGroup.newPassword
    )
    console.log(editedPassword);
      
    editPasswordSpinner.stop('Contraseña eliminada')
    outro('Hasta luego.')
    process.exit(0)

}

outro('Hasta luego.')

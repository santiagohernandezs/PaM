import * as p from '@clack/prompts'
import { intro, outro, select, spinner } from '@clack/prompts'
import color from 'picocolors'
import { setTimeout } from 'timers/promises'
import { options } from './options.js'
import {
  countPasswords,
  createPassword,
  deletePassword,
  findPassword,
  listPasswords,
  updatePassword
} from './services/index.js'

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
      await createPassword({
        provider: saveGroup.providerName,
        username: saveGroup.userName,
        password: saveGroup.password
      })
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
    const password = await findPassword({
      provider: viewGroup.providerName,
      username: viewGroup.userName
    })
    console.log(password)

    getPasswordSpinner.stop('Contraseña encontrada')

    outro('Hasta luego.')
    process.exit(0)

  case 'count':
    const countPasswordsSpinner = spinner()
    countPasswordsSpinner.start('Contando contraseñas')
    await setTimeout(2000)
    const count = await countPasswords()
    countPasswordsSpinner.stop(
      `Tienes ${count} ${count === 1 ? 'contraseña guardada' : 'contraseñas guardadas'}`
    )

    outro('Hasta luego.')
    process.exit(0)

  case 'list':
    const passwords = await listPasswords()
    console.log(
      passwords.map(password => ({
        provider: password.provider,
        username: password.username,
        password: password.password
      }))
    )

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
    const deletedPassword = await deletePassword({
      provider: deleteGroup.providerName,
      username: deleteGroup.userName
    })
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
          })
      },
      {
        onCancel: (): never => {
          p.cancel('Opreación cancelada.')
          process.exit(0)
        }
      }
    )

    const editPasswordSpinner = spinner()
    editPasswordSpinner.start('Editando contraseña')
    await setTimeout(2000)
    const editedPassword = await updatePassword({
      provider: editGroup.providerName,
      username: editGroup.userName,
      password: editGroup.newPassword
    })
    editPasswordSpinner.stop('Contraseña eliminada')
    outro('Hasta luego.')
    process.exit(0)
}

outro('Hasta luego.')

let nick: { name: string; edad: number }
nick = { name: 'nick', edad: 23 }
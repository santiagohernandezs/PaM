type Options = {
    label: string
    value: string
    hint: string
}

export const options: Record<string, Options> = {
    save: {
        label: 'Guardar contraseña',
        value: 'save',
        hint: 'Guardar una nueva contraseña'
    },
    view: {
        label: 'Ver contraseña',
        value: 'view',
        hint: 'Ver una contraseña'
    },
    count: {
        label: '¿Cuantas contraseñas tengo?',
        value: 'count',
        hint: 'Ver cuantas contraseñas tienes'
    },
    list: {
        label: 'Listar contraseña',
        value: 'list',
        hint: 'Listar todas las contraseñas'
    },
    delete: {
        label: 'Eliminar contraseña',
        value: 'delete',
        hint: 'Eliminar una contraseña'
    },
    edit: {
        label: 'Editar contraseña',
        value: 'edit',
        hint: 'Editar una contraseña existente'
    },
}
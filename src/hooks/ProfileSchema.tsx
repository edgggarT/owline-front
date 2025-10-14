import * as yup from 'yup'

const ProfileSchema = yup.object().shape({
    name: yup.string().min(3, 'El nombre debe tener almenos 3 caracteres').required('Este campo debe llenarse con el nombre nuevo o actual'),
    email: yup.string().email('El email no es valido').required('Este campo debe llenarse con el email nuevo o actual'),
    currentPassword: yup.string().min(8, 'La contraseña ingresada debe tener 8 caracteres minimos').required('Este campo debe llenarse con la contraseña actual'),
    newPassword: yup.string().min(8, 'La contraseña ingresada debe tener 8 caracteres minimos'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
})

export default ProfileSchema;
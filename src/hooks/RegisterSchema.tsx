import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
    name: yup.string()
             .max(20, 'Maximo de 20 caracteres superado!')
             .required('Este campo es obligatorio!, Recuerda completarlo'),
    email: yup.string()
              .email('El email debe ser valido')
              .required('Este campo es obligatorio!, Recuerda completarlo'),
    password: yup.string()
                 .required('Este campo es obligatorio!, Recuerda completarlo')
                 .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'La contraseña debe cumplir con todas las especificaciones!')
                 .min(10, 'Minimo de 10 caracteres!'),
    repeatPassword: yup.string()
                       .required('Este campo es obligatorio!, Recuerda completarlo')
                       .oneOf([yup.ref('password')], 'Las contraseñas no coinciden!')
})
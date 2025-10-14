import * as yup from 'yup'


export const CreateSchema = yup.object().shape({
    nombre: yup.string()
               .required('Este campo es obligatorio!'),
    apellido: yup.string()
                 .required('Este campo es obligatorio!'),
    email: yup.string()
              .email('El email debe ser valido!')
              .required('Este campo es obligatorio!'),
    telefono: yup.string()
                 .min(8, 'El numero es demasiado corto!')
                 .max(12, 'El numero es demasiado largo!')
                 .matches(/^[0-9]+$/, 'El numero de telefono deben ser solo digitos!')
                 .required('Este campo es obligatorio!'),
    dni: yup.string()
            .length(8, 'El DNI debe tener 8 digitos!')
            .matches(/^[0-9]+$/, 'El DNI deben ser solo digitos!')
            .required('Este campo es obligatorio!'),
    fecha_nacimiento: yup.date()
                         .required('Este campo es obligatorio!')
                         .max(new Date().toISOString(), 'La fecha es invalida')
                         .typeError('Formato invalido, el formato correcto es DD/MM/AAAA'),
    direccion_ciudad: yup.string().required('Este campo es obligatorio'),
    direccion_calle: yup.string().required('Este campo es obligatorio!'),
})
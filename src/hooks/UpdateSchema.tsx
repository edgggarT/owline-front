import * as yup from 'yup'


export const SearchSchema = yup.object().shape({
    dni: yup.string()
            .length(8, 'El DNI debe tener 8 digitos!')
            .matches(/^[0-9]+$/, 'El DNI deben ser solo digitos!')
            .required('Este campo es obligatorio!'),
})

export const UpdateSchema = yup.object().shape({

    nombre: yup.string()
               .nullable(),
    apellido: yup.string()
                 .nullable(),
    email: yup.string()
              .email('El email debe ser valido!')
              .nullable(),
    telefono: yup.string()
                 .min(8, 'El numero es demasiado corto!')
                 .max(12, 'El numero es demasiado largo!')
                 .matches(/^[0-9]+$/, 'El numero de telefono deben ser solo digitos!')
                 .nullable(),
    direccion_ciudad: yup.string().nullable(),
    direccion_calle: yup.string().nullable(),

})

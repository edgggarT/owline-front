import * as yup from 'yup'

export const DeleteSchema = yup.object().shape({
    dni: yup.string()
            .length(8, 'El DNI debe tener 8 digitos!')
            .matches(/^[0-9]+$/, 'El DNI deben ser solo digitos!')
            .required('Este campo es obligatorio!'),
})
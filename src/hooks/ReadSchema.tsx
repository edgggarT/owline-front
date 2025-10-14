import * as yup from 'yup'


export const dniSearchSchema = yup.object().shape({
    dni: yup.string()
            .length(8, 'El DNI debe tener 8 digitos!')
            .matches(/^[0-9]+$/, 'El DNI deben ser solo digitos!')
            .required('Este campo es obligatorio!'),
    
})

export const rangeSearchSchema = yup.object().shape({
    fecha_inicial: yup.date()
                     .required('Este campo es obligatorio!')
                     .max(yup.ref('fecha_final'), 'La fecha inicial debe ser menor a la fecha final'),
    fecha_final: yup.date()
                    .required('Este campo es obligatorio!')
                    .min(yup.ref('fecha_inicial'), 'La fecha final debe ser mayor a la fecha inicial')
})
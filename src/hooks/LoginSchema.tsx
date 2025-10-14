import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('el email es invalido').required('el email es requerido'),
    password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('la contraseña es requerida')
}) 

export default LoginSchema;
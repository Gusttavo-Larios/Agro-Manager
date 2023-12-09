import * as Yup from 'yup'

export const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Informe um E-mail válido.').required('O campo E-mail é obrigatório.'),
    password: Yup.string()
        .min(8, 'A senha deve ter no minímo 8 caracteres.')
        .required('O campo Senha é obrigatório.'),
});
import * as yup from 'yup'

export interface IUser {
	_id?: string
	name?: string
	email: string
	password: string
	lastUpdated?: Date
	createdAt?: Date
}

export const VUserLogin = yup.object().shape({
	email: yup.string().email().required('Campo obrigatório'),
	password: yup.string().email().required('Campo obrigatório'),
})

export const VUserRegister = yup.object().shape({
	name: yup.string().min(2, 'Deve possuir no mínimo 2 caracteres').required('Campo obrigatório'),
	email: yup.string().email().required('Campo obrigatório'),
	password: yup.string().required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/\d/, 'Password must contain at least one number')
  .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
  .test(
    'no-spaces',
    'Password must not contain spaces',
    (value: any) => value && !/\s/.test(value)
  )
})

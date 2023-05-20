import * as yup from 'yup'

export interface IPerson {
	_id?: string
	name: string
	tags?: string[]
	email?: string
	lastUpdated?: Date
	createdAt?: Date
}

export const VPerson = yup.object().shape({
	_id: yup.mixed().optional(),
	name: yup.string().min(2, 'Deve possuir no mínimo 2 caracteres').required('Campo obrigatório'),
	tags: yup.array().of(yup.string().required()).optional(),
	email: yup.string().email().optional(),
	lastUpdated: yup.date().optional(),
	createdAt: yup.date().optional()
})

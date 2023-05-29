import * as yup from 'yup'
import type { ITag } from './IVTag'

export interface IPerson {
	_id?: string
	name: string
	tags?: ITag[]
	email?: string
	lastUpdated?: Date
	createdAt?: Date
}

export const VPersonForm = yup.object().shape({
	_id: yup.mixed().optional(),
	name: yup.string().min(2, 'Deve possuir no mínimo 2 caracteres').required('Campo obrigatório'),
	tags: yup
		.array(
			yup.object().shape({
				label: yup.string().required(),
				value: yup.string().required()
			})
		)
		.optional(),
	email: yup.string().email().optional(),
	lastUpdated: yup.date().optional(),
	createdAt: yup.date().optional()
})

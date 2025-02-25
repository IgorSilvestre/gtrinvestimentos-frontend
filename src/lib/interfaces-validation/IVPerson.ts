import * as yup from 'yup'
import type { ICompany } from './IVCompany'
import type { IOption } from './IOption'

export interface IPerson {
	_id?: string
	name: string
	tags?: IOption[]
	company?: ICompany
	email?: string
  phone?: string
	target?: string
	vgv?: number
	landArea?: number
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
	phone: yup.string().optional(),
	company: yup
		.object()
		.shape({
			label: yup.string(),
			value: yup.string()
		}).optional().nullable(),
	target: yup.string().optional(),
	lastUpdated: yup.date().optional().nullable(),
	createdAt: yup.date().optional()
})

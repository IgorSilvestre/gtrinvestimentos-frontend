import * as yup from 'yup'
import type { ICompany } from './IVCompany'
import type { IOption } from './IOption'

export interface IPerson {
	_id?: string
	name: string
	tags?: IOption[]
	company?: ICompany
	email?: string
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
	company: yup.object().shape({
		label: yup.string().required(),
		value: yup.string().required()
	}).nullable(),
	target: yup.string().optional(),
	landArea: yup.number().optional(),
	vgv: yup.number().optional(),
	lastUpdated: yup.date().optional(),
	createdAt: yup.date().optional()
})

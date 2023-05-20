import * as yup from 'yup'
import type { IOption } from './IOption'
import type { IPerson } from './IVPerson'
import { textKeys } from '$lib/shared/textKeys'

export interface ICompany {
	_id?: string
	name: string
	description?: string
	target?: string
	tags?: IOption[]
	employees?: IPerson[]
	createdAt?: Date
	lastUpdated?: Date
}

export const VCompanyForm = yup.object().shape({
	name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
	tags: yup
		.array(
			yup.object().shape({
				label: yup.string().required(),
				value: yup.string().required()
			})
		)
		.optional(),
	employees: yup
		.array(
			yup.object().shape({
				label: yup.string().required(),
				value: yup.string().required()
			})
		)
		.optional(),
	description: yup.string().optional(),
	target: yup.string().optional(),
	lastUpdated: yup.date().optional()
})

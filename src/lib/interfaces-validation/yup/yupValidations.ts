import * as yup from 'yup'

export const positiveNumbersOrUndefined = yup
	.mixed()
	.transform((value, originalValue) =>
		typeof originalValue === 'object' ? undefined : parseFloat(value)
	)
	.transform((value) => (value <= 0 ? undefined : value))
	.nullable()

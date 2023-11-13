import type { IOption } from "./IOption"

export interface ISearchParams {
	query?: string
	tags?: IOption[] | string[]
	page?: number
	limit?: number
}

import { API_URL } from '$lib/config'
import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction'
import type { IOption } from '$lib/interfaces-validation/IOption'
import type { ICompany } from '$lib/interfaces-validation/IVCompany'


export async function load({ fetch, params }: ILoadFunction): Promise<{ company: ICompany, tags: IOption[] }> {
	const companyRes = await fetch(API_URL + 'v1/company/' + params.companyId)
	const [ company ] = await companyRes.json()
	const tagsRes: Response = await fetch(API_URL + 'tag/all-for-select')
	const tags = await tagsRes.json()
	return { company, tags }
}

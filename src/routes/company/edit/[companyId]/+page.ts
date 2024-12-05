import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'
import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction'
import type { ICompany } from '$lib/interfaces-validation/IVCompany'

export async function load({ fetch, params }: ILoadFunction): Promise<{ company: ICompany }> {
	const res: Response = await fetch(API_URL + APIEndpoints.company.url_v1 + params.companyId)
	const data: ICompany[] = await res.json()
	return { company: data[0] }
}

import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'
import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction'
import type { ICompany } from '$lib/interfaces-validation/IVCompany'

// TODO bring this to page.svelte so we can make a loading component
export async function load({ fetch }: ILoadFunction): Promise<{ companies: ICompany }> {
	const res: Response = await fetch(API_URL + APIEndpoints.company.getAll)
	const data = await res.json()
	return { companies: data }
}

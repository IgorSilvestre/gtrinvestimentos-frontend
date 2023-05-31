import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'
import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction'
import type { IPerson } from '$lib/interfaces-validation/IVPerson'

export async function load({ fetch }: ILoadFunction): Promise<{ people: IPerson[] }> {
	const res: Response = await fetch(API_URL + APIEndpoints.person.getAll)
	const data = await res.json()
	return { people: data }
}

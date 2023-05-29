import { API_URL } from '$lib/config'
import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction'
import type { IPerson } from '$lib/interfaces-validation/IVPerson'

export async function load({ fetch, params }: ILoadFunction): Promise<{ person: IPerson }> {
	const res: Response = await fetch(API_URL + '/person/' + params.personId)
	const data = await res.json()
	return { person: data }
}

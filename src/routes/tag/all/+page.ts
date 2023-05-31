import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'
import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction'
import type { ITag } from '$lib/interfaces-validation/IVTag'

export async function load({ fetch }: ILoadFunction): Promise<{ tags: ITag }> {
	const res: Response = await fetch(API_URL + APIEndpoints.tags.getAll)
	const data = await res.json()
	return { tags: data }
}

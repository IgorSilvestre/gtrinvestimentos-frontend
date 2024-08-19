import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'

export async function searchAssetsQuery(search: { query?: string, tags?: string[] } = {}) {
	return await fetch(API_URL + APIEndpoints.asset.search + `?query=${search.query}&tags=${search.tags}`)
}


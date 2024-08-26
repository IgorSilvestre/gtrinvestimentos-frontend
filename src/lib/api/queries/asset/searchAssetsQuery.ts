import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'

export async function searchAssetsQuery(search: { query?: string, tags?: string[] | string } = {}) {
    let endpoint = APIEndpoints.asset + '?'
    if (search.query && search.query !=='undefined') endpoint += `query=${search.query}`
    if (search.tags && search.query !=='undefined') endpoint += `&tags=${search.tags}`

    return await fetch(API_URL + endpoint)
}


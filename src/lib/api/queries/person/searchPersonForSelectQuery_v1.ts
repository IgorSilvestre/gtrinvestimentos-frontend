import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'

export async function searchPersonForSelectQuery_v1(query: string) {
	let searchParams: { query?: string } = { query }
	try {
    const { data } = await API.post(APIEndpoints.person.search, searchParams)
		return data
	} catch (err) {
		console.log(err)
	}
}


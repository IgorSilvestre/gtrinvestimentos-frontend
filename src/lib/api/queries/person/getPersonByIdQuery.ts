import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'

export async function getPersonByIdQuery(id: string) {
	try {
    const { data } = await API.post(APIEndpoints.person.url_v1 + id)
		return data
	} catch (err) {
		console.log(err)
	}
}


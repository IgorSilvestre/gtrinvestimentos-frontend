import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'

export async function getNeighberhoodByCityApiId(ApiId: string) {
	try {
		const { data } = await API.get(
			APIEndpoints.externalAPI.locations.getNeighborhoodByCityApiId + ApiId
		)
		return data
	} catch (error) {
		console.log(error)
	}
	return undefined
}

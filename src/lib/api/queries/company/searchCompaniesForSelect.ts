import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'

export async function searchCompaniesForSelectQuery(query: string) {
	try {
		const response = await API.get(APIEndpoints.company.searchForSelect + `?query=${query}` + `&partialStringSearch=true`)
		return response.data
	} catch (err) {
		console.log(err)
	}
}

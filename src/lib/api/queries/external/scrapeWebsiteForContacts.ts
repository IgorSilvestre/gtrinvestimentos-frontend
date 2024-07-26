import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'

export async function scrapeWebsiteForContactsQuery (domain: string) {
	const response = await API.get(`${APIEndpoints.externalAPI.scrapeWebsiteForContacts}${domain}`)
    return await response.data
}


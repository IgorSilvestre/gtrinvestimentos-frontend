import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'

export interface IFetchBusinessEmail {
	email: string
	score: number
}

export async function fetchBusinessEmail(name: string, domain: string): Promise<IFetchBusinessEmail | undefined> {
	try {
		const { data } = await API.get(
			APIEndpoints.externalAPI.fetchBusinessEmail + '?name=' + name + '&domain=' + domain
		)
		return data
	} catch (error) {
		console.log(error)
	}
	return undefined
}

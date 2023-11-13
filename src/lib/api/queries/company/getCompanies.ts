import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'
import { API_URL } from '$lib/config'
import type { ICompanyPaginated } from '$lib/interfaces-validation/IVCompany'
import { ITEMS_PER_PAGE } from '$lib/shared/stores'
import { get } from 'svelte/store'

const defaultLimit = get(ITEMS_PER_PAGE)

export async function getCompaniesQuery(page = 1, limit = defaultLimit): Promise<ICompanyPaginated | Error> {
	try {
		const { data } = await API.get(APIEndpoints.company.get + `?page=${page}&limit=${limit}`)
		return data
	} catch (err) {
		console.log(err)
		return new Error(JSON.stringify(err))
	}
}

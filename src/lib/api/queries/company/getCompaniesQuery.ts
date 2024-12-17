import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'
import { ITEMS_PER_PAGE } from '$lib/shared/stores'
import { get } from 'svelte/store'

const defaultLimit = get(ITEMS_PER_PAGE)

export async function getCompaniesQuery(page = 1, limit = defaultLimit) {
	return await API.get(APIEndpoints.company.get + `?page=${page}&limit=${limit}`)
}

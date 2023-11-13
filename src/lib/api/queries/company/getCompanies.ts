import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'
import { ITEMS_PER_PAGE } from '$lib/shared/stores'
import { get } from 'svelte/store'

const defaultLimit = get(ITEMS_PER_PAGE)

export async function getCompaniesQuery(page = 1, limit = defaultLimit) {
	return await fetch(API_URL + APIEndpoints.company.get + `?page=${page}&limit=${limit}`)
}

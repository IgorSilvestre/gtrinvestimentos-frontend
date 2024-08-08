import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'
import { ITEMS_PER_PAGE } from '$lib/shared/stores'
import { get } from 'svelte/store'

const defaultLimit = get(ITEMS_PER_PAGE)

export async function getAssetsQuery(page = 1, search = {}, limit = defaultLimit) {
	search = search ? encodeURIComponent(JSON.stringify(search)) : ''
	return await fetch(API_URL + APIEndpoints.asset.get + `?page=${page}&limit=${limit}&search=${search}`)
}

import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'
import { API_URL } from '$lib/config'
import { ITEMS_PER_PAGE } from '$lib/shared/stores'
import { get } from 'svelte/store'

const defaultLimit = get(ITEMS_PER_PAGE)
const defaultPage = 1

interface IParams {
  search?: { query?: string, tags?: string[] }
  page?: number
  limit?: number
  type?: string
}

export async function getAssetsQuery(params: IParams = {}) {
  let { search, page = defaultPage, limit = defaultLimit } = params;

  let endpoint = `${API_URL}${APIEndpoints.asset}?`;

  endpoint += (limit && limit > 1 && limit < 100) ? `&limit=${limit}` : `&limit=${defaultLimit}`;
  endpoint += (page && page > 1) ? `&page=${page}` : `&page=${defaultPage}`;

  if (search) {
    if (Array.isArray(search.tags) && search.tags.length === 0) delete search.tags
    if(search.query === '') delete search.query

    endpoint += Object.keys(search).length > 0 ? `&search=${encodeURIComponent(JSON.stringify(search))}` : '';

    endpoint += params.type ? `&type=${params.type}` : '' // Add type
  }

  const response = await API.get(endpoint);
  return response.data
}

import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API } from '$lib/api/apiFetch'
import { convertObjectToBase64 } from '$lib/shared/functions/convertObjectBase64'

export async function deepSearchAssetsQuery(params: Record<string, any> = {}) {
    const endpoint = `${APIEndpoints.assetDeepSearch}?query=${convertObjectToBase64(params)}`

    return await API.get(endpoint)
}


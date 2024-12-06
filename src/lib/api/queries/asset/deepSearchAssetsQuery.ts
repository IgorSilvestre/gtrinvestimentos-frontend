import { APIEndpoints } from '$lib/api/apiEndpoints'
import { API_URL } from '$lib/config'
import { convertObjectToBase64 } from '$lib/shared/functions/convertObjectBase64'

export async function deepSearchAssetsQuery(params: Record<string, any> = {}) {
    const endpoint = `${APIEndpoints.assetDeepSearch}?query=${convertObjectToBase64(params)}`
    console.log('endpoint', endpoint)

    return await fetch(API_URL + endpoint)
}


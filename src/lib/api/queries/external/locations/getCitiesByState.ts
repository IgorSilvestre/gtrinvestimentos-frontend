import { APIEndpoints } from "$lib/api/apiEndpoints"
import { API } from "$lib/api/apiFetch"

/**
 * @param state - e.g. "SP"
 */
export async function getCitiesByState (state: string) {
  try {
  const { data } = await API.get(APIEndpoints.externalAPI.locations.getCitiesByState + state)
  return data
  } catch (error) {
    console.log(error)
  }
  return undefined
}

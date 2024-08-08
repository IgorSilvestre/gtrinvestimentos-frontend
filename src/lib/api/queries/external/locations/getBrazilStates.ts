import { APIEndpoints } from "$lib/api/apiEndpoints"
import { API } from "$lib/api/apiFetch"

export async function getBrazilStates () {
  try {
  const { data } = await API.get(APIEndpoints.externalAPI.locations.getBrazilStates)
  return data
  } catch (error) {
    console.log(error)
  }
  return undefined
}

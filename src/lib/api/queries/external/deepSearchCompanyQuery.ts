import { APIEndpoints } from "$lib/api/apiEndpoints"
import { API } from "$lib/api/apiFetch"

export async function deepSearchCompanyQuery (domain: string) {
  try {
  const { data } = await API.get(APIEndpoints.externalAPI.deepSearchCompany + '/' + domain)
  return data
  } catch (error) {
    console.log(error)
  }
  return undefined
}

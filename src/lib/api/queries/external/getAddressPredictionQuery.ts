import { APIEndpoints } from "$lib/api/apiEndpoints"

export async function getAddressPredictionsQuery(query: string): Promise<{ predictions: { description: string }[], status: string }> {
  const response = await fetch(`${APIEndpoints.externalAPI.getAddressAutocompleteFullAPI}${query}`)
  return await response.json()
}


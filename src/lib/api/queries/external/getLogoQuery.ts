import { APIEndpoints } from "$lib/api/apiEndpoints"
import { extractDomainFromString } from "$lib/shared/functions/extractDomainFromString"
import { isValidURL } from "$lib/shared/functions/isValidURL"

export function handleGetLogo(url: string) {
  if (!isValidURL(url)) return
  return APIEndpoints.externalAPI.getLogoByDomain + extractDomainFromString(url)
}
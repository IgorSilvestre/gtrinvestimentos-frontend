import { APIEndpoints } from "$lib/api/apiEndpoints"
import { getDomainFromURL } from "$lib/shared/functions/getDomainFromURL"
import { isValidURL } from "$lib/shared/functions/isValidURL"

export function handleGetLogo(url: string) {
  if (!isValidURL(url)) return
  return APIEndpoints.externalAPI.getLogoByDomain + getDomainFromURL(url)
}
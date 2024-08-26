import { convertBase64ToObject } from "./convertObjectBase64"

export function getParamsFromURL (url: string) {
  if(!url) return
  if(typeof url !== 'string') return

		const urlParams = new URLSearchParams(url)
    const data = urlParams.get('data') as string
    return convertBase64ToObject(data)
}

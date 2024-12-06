export function getParamsFromURL (url: string) {
  if(!url) return
  if(typeof url !== 'string') return

	return new URLSearchParams(url)
}

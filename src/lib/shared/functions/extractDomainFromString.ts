export function extractDomainFromString(input: unknown): string | null {
	if (typeof input !== 'string') return null

	const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+[^/\s]*)/;

	const match = input.match(domainRegex)
	
	if (match && match[1]) return match[1]
	else return null
}

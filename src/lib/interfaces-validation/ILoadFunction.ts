export interface ILoadFunction {
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
	page: number
	params: Record<string, string>
}

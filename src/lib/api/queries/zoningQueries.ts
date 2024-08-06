import { APIEndpoints } from '../apiEndpoints'
import { API } from '../apiFetch'

export async function getSelectZoningOptions() {
	const { data } = await API.get(APIEndpoints.zoning.getAllForSelect)
	return data
}

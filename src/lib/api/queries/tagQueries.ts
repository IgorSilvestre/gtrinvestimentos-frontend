import { APIEndpoints } from '../apiEndpoints'
import { API } from '../apiFetch'

export async function getSelectTagOptions() {
	const { data } = await API.get(APIEndpoints.tags.getAllForSelect)
	return data
}

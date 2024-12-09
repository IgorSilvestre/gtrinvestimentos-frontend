import { APIEndpoints } from "$lib/api/apiEndpoints";
import { API } from "$lib/api/apiFetch";
import { type IUser } from "$lib/interfaces-validation/IVUser";

export async function loginQuery (user: IUser) {
  const response = await API.post(APIEndpoints.auth.login, user, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  })

  if (response.status === 200) {
    return response
  } else {
    throw new Error('Login failed');
  }
}

import { A as APIEndpoints } from "./apiEndpoints.js";
import { A as API } from "./apiFetch.js";
async function getSelectTagOptions() {
  const { data } = await API.get(APIEndpoints.tags.getAllForSelect);
  return data;
}
export {
  getSelectTagOptions as g
};

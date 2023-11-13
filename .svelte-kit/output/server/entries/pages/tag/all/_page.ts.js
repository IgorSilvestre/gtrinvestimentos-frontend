import { A as APIEndpoints } from "../../../../chunks/apiEndpoints.js";
import { A as API_URL } from "../../../../chunks/config.js";
async function load({ fetch }) {
  const res = await fetch(API_URL + APIEndpoints.tags.getAll);
  const data = await res.json();
  return { tags: data };
}
export {
  load
};

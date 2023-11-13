import { A as API_URL } from "../../../../../chunks/config.js";
async function load({ fetch, params }) {
  const res = await fetch(API_URL + "person/" + params.personId);
  const data = await res.json();
  return { person: data };
}
export {
  load
};

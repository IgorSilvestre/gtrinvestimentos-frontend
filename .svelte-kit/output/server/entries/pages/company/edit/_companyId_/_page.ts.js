import { A as API_URL } from "../../../../../chunks/config.js";
async function load({ fetch, params }) {
  const res = await fetch(API_URL + "company/" + params.companyId);
  const data = await res.json();
  return { company: data };
}
export {
  load
};

import { A as API_URL } from "../../../../chunks/config.js";
async function load({ fetch, params }) {
  const companyRes = await fetch(API_URL + "company/" + params.companyId);
  const company = await companyRes.json();
  const tagsRes = await fetch(API_URL + "tag/all-for-select");
  const tags = await tagsRes.json();
  return { company, tags };
}
export {
  load
};

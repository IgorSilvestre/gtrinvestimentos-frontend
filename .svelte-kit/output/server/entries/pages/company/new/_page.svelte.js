import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index2.js";
import { C as CompanyForm } from "../../../../chunks/CompanyForm.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(CompanyForm, "CompanyForm").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};

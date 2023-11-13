import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/index2.js";
import { C as CompanyForm } from "../../../../../chunks/CompanyForm.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { company } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main>${validate_component(CompanyForm, "CompanyForm").$$render($$result, { company }, {}, {})}</main>`;
});
export {
  Page as default
};

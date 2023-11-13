import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/index2.js";
import { P as PersonForm } from "../../../../../chunks/PersonForm.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { person } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main>${validate_component(PersonForm, "PersonForm").$$render($$result, { person }, {}, {})}</main>`;
});
export {
  Page as default
};

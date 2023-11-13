import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { t as textKeys, S as Search } from "../../../chunks/Search.js";
/* empty css                                                    */const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main><div class="mt-4">${validate_component(Search, "Search").$$render(
    $$result,
    {
      domainToFilter: textKeys.domains.externalAPI
    },
    {},
    {}
  )}</div>
	<div class="w-full">${`${``}`}</div></main>`;
});
export {
  Page as default
};

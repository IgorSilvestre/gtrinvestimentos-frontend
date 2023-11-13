import { c as create_ssr_component, b as subscribe, v as validate_component } from "../../../chunks/index2.js";
import { I as ITEMS_PER_PAGE, L as Loader } from "../../../chunks/Loader.js";
import { t as textKeys, S as Search } from "../../../chunks/Search.js";
const CopyToClipboardButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content } = $$props;
  let copied = false;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  {
    {
      copied = false;
    }
  }
  return `${copied ? `<div class="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded">Copiado!</div>` : `<button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Copiar emails
	</button>`}`;
});
let itemsPerPageValue;
ITEMS_PER_PAGE.subscribe((value) => {
  itemsPerPageValue = value;
});
function getTotalPages(items) {
  if (!items)
    return 0;
  return Math.ceil(items.length / itemsPerPageValue);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_ITEMS_PER_PAGE;
  $$unsubscribe_ITEMS_PER_PAGE = subscribe(ITEMS_PER_PAGE, (value) => value);
  getTotalPages([]);
  let emailsToCopy = "";
  {
    {
      getTotalPages([]);
    }
  }
  $$unsubscribe_ITEMS_PER_PAGE();
  return `<main><div class="flex justify-end mx-4 my-2"><button type="button" class="p-2 text-black bg-green-400 rounded-2xl">Criar Pessoa</button></div>
	<div class="p-4">${validate_component(Search, "Search").$$render($$result, { domainToFilter: textKeys.domains.person }, {}, {})}</div>

	<div class="flex justify-center mx-4 my-2">${validate_component(CopyToClipboardButton, "CopyToClipboardButton").$$render($$result, { content: emailsToCopy }, {}, {})}</div>

	${`${`<div class="flex justify-center mx-4 my-6">${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}</div>`}`}</main>`;
});
export {
  Page as default
};

import { h as get_store_value, c as create_ssr_component, j as createEventDispatcher, f as add_attribute, k as is_promise, n as noop, v as validate_component } from "../../../chunks/index2.js";
import { A as APIEndpoints } from "../../../chunks/apiEndpoints.js";
import { I as ITEMS_PER_PAGE, L as Loader } from "../../../chunks/Loader.js";
import { A as API } from "../../../chunks/apiFetch.js";
import { g as getSelectTagOptions } from "../../../chunks/tagQueries.js";
import { S as Select, c as customSelectFilter } from "../../../chunks/Select.js";
get_store_value(ITEMS_PER_PAGE);
const SearchTextAndTags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { endpoint } = $$props;
  const dispatch = createEventDispatcher();
  let selectTagOptionsPromise = getSelectTagOptions();
  let query = "";
  let tags = [];
  async function handleSearch(endpoint2, searchParams) {
    if (tags && tags.length > 0) {
      const tagIds = tags.map((tag) => tag.value.trim());
      searchParams.tags = tagIds;
    } else
      delete searchParams.tags;
    try {
      const res = await API.get(endpoint2 + "?" + new URLSearchParams(searchParams).toString());
      console.log("SHOULD DISPATCH", await res.data);
      dispatch("search", {
        data: await res.data,
        params: searchParams
      });
    } catch (err) {
      console.log(err);
      return new Error(JSON.stringify(err));
    }
  }
  if ($$props.endpoint === void 0 && $$bindings.endpoint && endpoint !== void 0)
    $$bindings.endpoint(endpoint);
  if ($$props.handleSearch === void 0 && $$bindings.handleSearch && handleSearch !== void 0)
    $$bindings.handleSearch(handleSearch);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<main><label class="text-center block uppercase tracking-wide font-bold" for="name">Busca </label>
	<div class="flex flex-col md:flex-row items-center justify-center"><div class="flex flex-col items-center md:w-1/2"><label class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">Texto
			</label>
			<input placeholder="Pesquisa geral" class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="searchText"${add_attribute("value", query, 0)}>
			${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
				<p>Loading Search...</p>
			`;
      }
      return function(selectTagOptions) {
        return `
				<label class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="tags">Tags
				</label>
				${validate_component(Select, "Select").$$render(
          $$result,
          {
            placeholder: "Pesquisar por tags",
            items: selectTagOptions,
            multiple: true,
            filter: customSelectFilter,
            value: tags
          },
          {
            value: ($$value) => {
              tags = $$value;
              $$settled = false;
            }
          },
          {}
        )}
			`;
      }(__value);
    }(selectTagOptionsPromise)}</div>
		<div class="flex items-center justify-center md:ml-10 mt-4 md:mt-0"><button class="btn variant-filled-primary ml-3">Buscar
			</button></div></div></main>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let SearchTextAndTagsComponent;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<main><div class="flex justify-end my-2 mx-4"><button type="button" class="text-black bg-green-400 p-2 rounded-2xl">Criar Empresa
		</button></div>
	<div class="p-4">${validate_component(SearchTextAndTags, "SearchTextAndTags").$$render(
      $$result,
      {
        endpoint: APIEndpoints.company.search,
        this: SearchTextAndTagsComponent
      },
      {
        this: ($$value) => {
          SearchTextAndTagsComponent = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
	${`${`<div class="flex justify-center mx-4 my-6">${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}</div>`}`}</main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};

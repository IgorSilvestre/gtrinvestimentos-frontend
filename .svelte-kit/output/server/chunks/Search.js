import { c as create_ssr_component, j as createEventDispatcher, f as add_attribute, k as is_promise, n as noop, v as validate_component } from "./index2.js";
import "./apiFetch.js";
import { g as getSelectTagOptions } from "./tagQueries.js";
import { S as Select, c as customSelectFilter } from "./Select.js";
const textKeys = {
  yupStringMandatory: "Campo deve ser string",
  yupMandatory: "Campo obrigatório",
  domains: {
    company: "Company",
    person: "Person",
    externalAPI: "ExternalAPI"
  },
  dispatch: {
    search: "search"
  }
};
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { domainToFilter } = $$props;
  createEventDispatcher();
  let selectTagOptionsPromise;
  domainToFilter !== textKeys.domains.externalAPI ? selectTagOptionsPromise = getSelectTagOptions() : null;
  let tagsSelected = [];
  let query = "";
  if ($$props.domainToFilter === void 0 && $$bindings.domainToFilter && domainToFilter !== void 0)
    $$bindings.domainToFilter(domainToFilter);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${domainToFilter ? `<main><label class="text-center block uppercase tracking-wide font-bold" for="name">Busca </label>
		<div class="flex flex-col md:flex-row items-center justify-center"><div class="flex flex-col items-center md:w-1/2"><label class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">Texto
				</label>
				<input placeholder="Pesquisa geral" class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="searchText"${add_attribute("value", query, 0)}>
				${domainToFilter !== textKeys.domains.externalAPI ? `${function(__value) {
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
            value: tagsSelected
          },
          {
            value: ($$value) => {
              tagsSelected = $$value;
              $$settled = false;
            }
          },
          {}
        )}
					`;
      }(__value);
    }(selectTagOptionsPromise)}` : ``}</div>
			<div class="flex items-center justify-center md:ml-10 mt-4 md:mt-0"><button class="btn variant-filled-primary ml-3">Buscar
				</button></div></div></main>` : `<p>No domain passed to filter..</p>`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Search as S,
  textKeys as t
};

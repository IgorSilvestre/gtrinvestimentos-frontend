import { c as create_ssr_component, f as add_attribute } from "../../../chunks/index2.js";
import "../../../chunks/apiFetch.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cnpj;
  return `<main class="mt-4"><p class="text-center">Caso queira pesquisar o CNPJ clique
		<a href="https://www.diretoriobrasil.net/" class="text-blue-800">aqui</a></p>
	<div class="items-center text-center"><label class="text-center block uppercase tracking-wide font-bold" for="name">Busca </label>
		
		<div class="flex flex-col md:flex-row items-center justify-center"><div class="flex flex-col items-center md:w-1/2"><label class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name"></label>
				<input placeholder="Pesquisa geral" class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="searchText"${add_attribute("value", cnpj, 0)}></div></div></div>
	<div class="p-4 mt-10">${``}</div></main>`;
});
export {
  Page as default
};

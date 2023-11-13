import { c as create_ssr_component, e as escape, d as each, v as validate_component, f as add_attribute } from "./index2.js";
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { color } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `${name ? `<span class="${"badge variant-filled-" + escape(color, true)}">${escape(name)}</span>` : ``}`;
});
const PersonCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { person } = $$props;
  let { noEdit = false } = $$props;
  if ($$props.person === void 0 && $$bindings.person && person !== void 0)
    $$bindings.person(person);
  if ($$props.noEdit === void 0 && $$bindings.noEdit && noEdit !== void 0)
    $$bindings.noEdit(noEdit);
  return `<div class="bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2"><div class="p-4"><h2 class="text-lg font-medium text-gray-900 mb-2">${escape(person?.name)}</h2>
		<div class="flex flex-wrap mb-2">${person?.tags && person?.tags.length > 0 ? `${each(person?.tags, (tag) => {
    return `${validate_component(Tag, "Tag").$$render($$result, { color: "primary", name: tag.label }, {}, {})}`;
  })}` : ``}</div>
		${person?.company ? `<p class="text-gray-700 text-sm"><span class="font-bold">Empresa:</span>
				<a${add_attribute("href", "/company/" + person?.company?._id, 0)}>${validate_component(Tag, "Tag").$$render(
    $$result,
    {
      color: "secondary",
      name: person?.company?.name
    },
    {},
    {}
  )}</a></p>` : ``}
		${person?.email ? `<p class="text-gray-700 text-sm"><span class="font-bold">Email:</span>
				${escape(person?.email)}</p>` : ``}
		${person?.target ? `<p class="text-gray-700 text-sm"><span class="font-bold">Target:</span>
				${escape(person?.target)}</p>` : ``}
		${person?.vgv ? `<p class="text-gray-700 text-sm"><span class="font-bold">VGV:</span>
				${escape(person?.vgv)}</p>` : ``}
		${person?.landArea ? `<p class="text-gray-700 text-sm"><span class="font-bold">Área do Terreno:</span>
				${escape(person?.landArea)}</p>` : ``}
		<div class="flex flex-col justify-end mt-4"><p class="text-gray-600 text-xs">Criação: ${escape(person?.createdAt)}</p>
			<p class="text-gray-600 text-xs">Última alteração: ${escape(person?.lastUpdated)}</p></div>
		${!noEdit ? `<div class="flex justify-end"><button type="button" class="text-blue-500 font-bold">Editar
				</button></div>` : ``}</div></div>`;
});
export {
  PersonCard as P,
  Tag as T
};

import { c as create_ssr_component, e as escape, d as each, v as validate_component, f as add_attribute } from "../../../../chunks/index2.js";
import { T as Tag, P as PersonCard } from "../../../../chunks/PersonCard.js";
const CompanyCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { company } = $$props;
  let { noEdit = false } = $$props;
  if ($$props.company === void 0 && $$bindings.company && company !== void 0)
    $$bindings.company(company);
  if ($$props.noEdit === void 0 && $$bindings.noEdit && noEdit !== void 0)
    $$bindings.noEdit(noEdit);
  return `<div class="bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2"><div class="p-4"><h2 class="text-lg font-medium text-gray-900">${escape(company?.name)}</h2>
		<div class="flex flex-wrap mb-2">${company?.tags && company?.tags.length > 0 ? `${each(company?.tags, (tag) => {
    return `${validate_component(Tag, "Tag").$$render($$result, { color: "primary", name: tag.label }, {}, {})}`;
  })}` : ``}</div>
		${company?.description ? `<p class="text-gray-700 text-sm"><span class="font-bold">Descrição:</span>
				${escape(company?.description)}</p>` : ``}
		${company?.target ? `<p class="text-gray-700 text-sm"><span class="font-bold">Target:</span>
				${escape(company?.target)}</p>` : ``}
		${company?.employees && company?.employees.length > 0 ? `<div class="flex flex-col mt-1"><p class="text-gray-700 text-sm"><span class="font-bold">Funcionários:</span></p>
				<div class="flex flex-wrap">${each(company?.employees, (employee) => {
    return `<a${add_attribute("href", "/person/" + employee._id, 0)}>${validate_component(Tag, "Tag").$$render($$result, { color: "secondary", name: employee.name }, {}, {})}
						</a>`;
  })}</div></div>` : ``}
		<div class="flex justify-between"><div class="flex flex-col justify-end mt-4"><p class="text-gray-600 text-xs">Criação: ${escape(company?.createdAt)}</p>
				<p class="text-gray-600 text-xs">Última alteração: ${escape(company?.lastUpdated)}</p></div>
			${!noEdit ? `<div class="flex justify-end"><button type="button" class="font-bold text-blue-500">Editar
					</button></div>` : ``}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { company, tags } = data;
  const employees = company.employees || [];
  const employeesParsed = [];
  for (const person of employees) {
    const employeeTags = person.tags?.flatMap((tagId) => tags.filter((tag) => tag.value === tagId));
    employeesParsed.push({ ...person, tags: employeeTags, company });
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main>${validate_component(CompanyCard, "CompanyCard").$$render($$result, { company }, {}, {})}

	${employees.length > 0 ? `<h2 class="text-lg font-medium text-gray-900 mb-2 mx-4">Funcionários:</h2>
		${each(employeesParsed, (person) => {
    return `<a href="${"/person/" + escape(person._id, true)}">${validate_component(PersonCard, "PersonCard").$$render($$result, { person, noEdit: true }, {}, {})}
			</a>`;
  })}` : ``}</main>`;
});
export {
  Page as default
};

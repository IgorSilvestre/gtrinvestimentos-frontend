import { c as create_ssr_component, b as subscribe, f as add_attribute, e as escape, k as is_promise, n as noop, v as validate_component } from "./index2.js";
import { A as API } from "./apiFetch.js";
import { p as parseArrayOfOptionsToIds, g as goto } from "./parseOptionToId.js";
import { c as createForm } from "./create-form.js";
import * as yup from "yup";
import { S as Select, c as customSelectFilter } from "./Select.js";
import { g as getSelectTagOptions } from "./tagQueries.js";
import { t as toastStore } from "./ProgressBar.svelte_svelte_type_style_lang.js";
import { t as toastUpdated, a as toastRegistered } from "./config.js";
const VCompanyForm = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  tags: yup.array(
    yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
  ).optional(),
  employees: yup.array(
    yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
  ).optional(),
  description: yup.string().optional(),
  target: yup.string().optional(),
  lastUpdated: yup.date().optional()
});
const CompanyForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let { company = void 0 } = $$props;
  let selectTagOptionsPromise = getSelectTagOptions();
  let initialValues = {
    name: company?.name ?? "",
    description: company?.description ?? "",
    target: company?.target ?? "",
    tags: company?.tags ?? []
  };
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues,
    validationSchema: VCompanyForm,
    onSubmit: async (companyFormUpdated) => {
      const normalizedTags = parseArrayOfOptionsToIds(companyFormUpdated?.tags);
      const companyParsed = {
        ...companyFormUpdated,
        tags: normalizedTags
      };
      try {
        company ? await API.put("company/" + company?._id, companyParsed).then(() => {
          toastStore.trigger(toastUpdated);
          goto("/company/" + company?._id);
        }) : await API.post("company", companyParsed).then((response) => {
          toastStore.trigger(toastRegistered);
          goto("/company/" + response.data._id);
        });
      } catch (error) {
        const { clientMessage } = error.response.data.error;
        toastStore.trigger({
          message: clientMessage || "Ocorreu um erro",
          background: "variant-filled-error"
        });
        console.error(error);
      } finally {
      }
    }
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  if ($$props.company === void 0 && $$bindings.company && company !== void 0)
    $$bindings.company(company);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="bg-white rounded-lg overflow-hidden shadow-lg"><div class="p-4"><h2 class="text-lg font-medium text-gray-900 mb-2">Editar Empresa</h2>
		<form><div class="flex flex-wrap mb-4"><div class="w-full md:w-1/2 px-3 mb-6 md:mb-0"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">Nome
					</label>
					<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="name"${add_attribute("value", $form.name, 0)}>
					${$errors.name ? `<div class="text-red-500 text-xs">${escape($errors.name)}</div>` : ``}</div>
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="target">Target
					</label>
					<textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="target">${escape($form.target || "")}</textarea>
					${$errors.target ? `<div class="text-red-500 text-xs">${escape($errors.target)}</div>` : ``}</div></div>
			<div class="mb-4"><p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Tags
					${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
						<p>Loading tag options...</p>
					`;
      }
      return function(selectTagOptions) {
        return `
						${validate_component(Select, "Select").$$render(
          $$result,
          {
            items: selectTagOptions,
            multiple: true,
            filter: customSelectFilter,
            required: true,
            value: $form.tags
          },
          {
            value: ($$value) => {
              $form.tags = $$value;
              $$settled = false;
            }
          },
          {}
        )}
					`;
      }(__value);
    }(selectTagOptionsPromise)}</p></div>
			<div class="mb-4"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">Descrição
				</label>
				<textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="description" rows="3">${escape($form.description || "")}</textarea>
				${$errors.description ? `<div class="text-red-500 text-xs">${escape($errors.description)}</div>` : ``}</div>
			<div class="flex justify-end"><button type="submit" class="text-blue-500 font-bold">Salvar</button></div></form></div></div>`;
  } while (!$$settled);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return $$rendered;
});
export {
  CompanyForm as C
};

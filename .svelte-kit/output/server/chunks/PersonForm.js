import { c as create_ssr_component, j as createEventDispatcher, b as subscribe, f as add_attribute, e as escape, k as is_promise, n as noop, v as validate_component } from "./index2.js";
import { A as API } from "./apiFetch.js";
import { p as parseArrayOfOptionsToIds, g as goto } from "./parseOptionToId.js";
import { c as createForm } from "./create-form.js";
import * as yup from "yup";
import { S as Select, c as customSelectFilter } from "./Select.js";
import { A as APIEndpoints } from "./apiEndpoints.js";
import { t as toastUpdated, a as toastRegistered } from "./config.js";
import { t as toastStore } from "./ProgressBar.svelte_svelte_type_style_lang.js";
const positiveNumbersOrUndefined = yup.mixed().transform(
  (value, originalValue) => typeof originalValue === "object" ? void 0 : parseFloat(value)
).transform((value) => value <= 0 ? void 0 : value).nullable();
const VPersonForm = yup.object().shape({
  _id: yup.mixed().optional(),
  name: yup.string().min(2, "Deve possuir no mínimo 2 caracteres").required("Campo obrigatório"),
  tags: yup.array(
    yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
  ).optional(),
  email: yup.string().email().optional(),
  company: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  }).nullable(),
  target: yup.string().optional(),
  landArea: positiveNumbersOrUndefined.optional(),
  vgv: yup.number().min(0, "Número deve ser positivo").nullable().optional(),
  lastUpdated: yup.date().optional().nullable(),
  createdAt: yup.date().optional()
});
const PersonForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let { person = void 0 } = $$props;
  const dispatch = createEventDispatcher();
  async function getSelectTagOptions() {
    const { data } = await API.get(APIEndpoints.tags.getAllForSelect);
    return data;
  }
  async function getSelectCompanyOptions() {
    const { data } = await API.get(APIEndpoints.company.getAllForSelect);
    return data;
  }
  let selectTagOptionsPromise = getSelectTagOptions();
  let selectCompanyOptionsPromise = getSelectCompanyOptions();
  let initialValues = {
    name: person?.name ?? "",
    email: person?.email ?? "",
    target: person?.target ?? "",
    tags: person?.tags ?? [],
    vgv: person?.vgv,
    landArea: person?.landArea,
    company: person ? {
      value: person?.company?._id ?? "",
      label: person?.company?.name ?? ""
    } : void 0
  };
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues,
    validationSchema: VPersonForm,
    onSubmit: async (personFormUpdated) => {
      const normalizedTags = parseArrayOfOptionsToIds(personFormUpdated?.tags);
      const personParsed = {
        ...personFormUpdated,
        tags: normalizedTags,
        company: personFormUpdated.company?.value
      };
      try {
        person ? await API.put("person/" + person?._id, personParsed).then((response) => {
          dispatch("personUpdated", response.data);
          toastStore.trigger(toastUpdated);
          goto("/person/" + person?._id);
        }) : await API.post("person", personParsed).then((response) => {
          console.log("response>>", response);
          toastStore.trigger(toastRegistered);
          goto("/person/" + response.data._id);
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
  if ($$props.person === void 0 && $$bindings.person && person !== void 0)
    $$bindings.person(person);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="bg-white rounded-lg overflow-hidden shadow-lg"><div class="p-4"><h2 class="text-lg font-medium text-gray-900 mb-2">Criar/Editar Pessoa</h2>
		<form><div class="mb-4"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">Nome
				</label>
				<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="name"${add_attribute("value", $form.name, 0)}>
				${$errors.name ? `<div class="text-red-500 text-xs">${escape($errors.name)}</div>` : ``}</div>
			<div class="mb-4"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">Email
				</label>
				<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="email" id="email"${add_attribute("value", $form.email, 0)}>
				${$errors.email ? `<div class="text-red-500 text-xs">${escape($errors.email)}</div>` : ``}</div>

			<div class="mb-4"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">Target
				</label>
				<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="target"${add_attribute("value", $form.target, 0)}>
				${$errors.target ? `<div class="text-red-500 text-xs">${escape($errors.target)}</div>` : ``}</div>
			<div class="mb-4"><p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">Tags
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
    }(selectTagOptionsPromise)}</p>
				<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Companies
					${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
						<p>Loading companies...</p>
					`;
      }
      return function(selectCompanies) {
        return `
						${validate_component(Select, "Select").$$render(
          $$result,
          {
            items: selectCompanies,
            filter: customSelectFilter,
            value: $form.company
          },
          {
            value: ($$value) => {
              $form.company = $$value;
              $$settled = false;
            }
          },
          {}
        )}
						
						
					`;
      }(__value);
    }(selectCompanyOptionsPromise)}</p></div>
			<hr class="border-t-2">
			<h5 class="my-4">Real State</h5>
			<div class="mb-4"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">VGV
				</label>
				<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" id="vgv" min="0"${add_attribute("value", $form.vgv, 0)}>
				${$errors.vgv ? `<div class="text-red-500 text-xs">${escape($errors.vgv)}</div>` : ``}</div>
			<div class="mb-4"><label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">Área do Terreno
				</label>
				<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" id="landArea" min="0"${add_attribute("value", $form.landArea, 0)}>
				${$errors.vgv ? `<div class="text-red-500 text-xs">${escape($errors.landArea)}</div>` : ``}</div>
			<div class="flex justify-end">
				<button type="submit" class="text-blue-500 font-bold">Salvar</button></div></form></div></div>`;
  } while (!$$settled);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return $$rendered;
});
export {
  PersonForm as P
};

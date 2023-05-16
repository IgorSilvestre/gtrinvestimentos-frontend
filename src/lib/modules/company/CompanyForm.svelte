<script lang="ts">
  import { API } from "$lib/api/API";
  import { goto } from "$app/navigation";
  import { createForm } from "svelte-forms-lib";
  import type { ICompany } from "$lib/interfaces-validation/IVCompany";
  import { VCompany } from "$lib/interfaces-validation/IVCompany";
  import Select from "svelte-select";
  import { customSelectFilter } from "$lib/utils/filterStringSearch";
  import type { IOption } from "$lib/interfaces-validation/IOption";
  import SaveEditButton from "$lib/modules/SaveEditButton.svelte";

  export let company: ICompany;

  async function getSelectTagOptions() {
    const { data } = await API.get("tag/forSelect");
    return data;
  }

  let isSaving = false;
  let selectTagOptionsPromise: Promise<IOption[]> = getSelectTagOptions();

  let initialValues = {
    name: company?.name ?? "",
    description: company?.description ?? "",
    target: company?.target ?? "",
    tags: company?.tags ?? []
  };


  const { form, errors, touched, handleChange, handleSubmit } = createForm({
    initialValues,
    validationSchema: VCompany,
    onSubmit: async (companyFormUpdated: ICompany) => {
      const normalizedTags: string[] = companyFormUpdated.tags.map((tag: any) => tag.value);
      try {
        isSaving = true;
        company ?
          await API.put(`company/${company._id}`, { // update company
              ...companyFormUpdated,
              tags: normalizedTags
            }
          )
          :
          await API.post("company", {
            ...companyFormUpdated,
            tags: normalizedTags
          }); // create company

        await goto("/company/" + company._id);
        // Do something after the company is saved, e.g. redirect to the document page
      } catch (error) {
        console.error(error);
      } finally {
        isSaving = false;
      }
    }
  });
</script>

<div class="bg-white rounded-lg overflow-hidden shadow-lg">
  <div class="p-4">
    <h2 class="text-lg font-medium text-gray-900 mb-2">Editar Empresa</h2>
    <form on:submit={handleSubmit}>
      <div class="flex flex-wrap mb-4">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="name"
          >
            Nome
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="name"
            on:input={handleChange}
            bind:value={$form.name}
          />
          {#if $errors.name}
            <div class="text-red-500 text-xs">{$errors.name}</div>
          {/if}
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="target"
          >
            Target
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            id="target"
            on:input={handleChange}
            bind:value={$form.target}
          />
          {#if $errors.target}
            <div class="text-red-500 text-xs">{$errors.target}</div>
          {/if}
        </div>
      </div>
      <div class="mb-4">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Tags
          <span class="text-gray-600 text-xs">(separe com vírgulas)</span>
          {#await selectTagOptionsPromise}
            <p>Loading tag options...</p>
          {:then selectTagOptions}
            <Select items={selectTagOptions} multiple filter={customSelectFilter} bind:value={$form.tags} />
            {#if $errors.tags && $touched.tags}
              <div class="text-red-500 text-xs">{$errors.tags}</div>
            {/if}
          {/await}
        </label>
      </div>
      <div class="mb-4">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="description"
        >
          Descrição
        </label>
        <textarea
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="description"
          rows="3"
          on:input={handleChange}
          bind:value={$form.description}></textarea>
        {#if $errors.description}
          <div class="text-red-500 text-xs">{$errors.description}</div>
        {/if}
      </div>
      <div class="flex justify-end">
        <SaveEditButton type="submit">Salvar</SaveEditButton>
      </div>
    </form>
  </div>
</div>

<script lang="ts">
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { API } from '$lib/api/apiFetch'
	import { getSelectTagOptions } from '$lib/api/queries/tagQueries'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import { IOptionToId } from '$lib/shared/functions/IOptionToId'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
  import { createEventDispatcher } from 'svelte'
	import Select from 'svelte-select'

	let selectTagOptionsPromise: Promise<IOption[]> = getSelectTagOptions()

	let tagsSelected: IOption[] = []

    const dispatch = createEventDispatcher()
</script>

<main>
	<!-- TODO implementar busca por tags-->
	<p class="w-full tracking-wide uppercase text-gray-700 text-xs font-bold">Busca</p>
	<div class="flex items-center">
		{#await selectTagOptionsPromise}
			<p>Loading Search...</p>
		{:then selectTagOptions}
			<Select
				items={selectTagOptions}
				multiple
				filter={customSelectFilter}
				bind:value={tagsSelected}
			/>
			<!-- TODO check if this component can work with validation -->
			<!-- {#if $errors.tags && $touched.tags}
							<div class="text-red-500 text-xs">{$errors.tags}</div>
						{/if} -->
		{/await}
		<button
			class="btn variant-filled-primary ml-3"
			on:click={async () => {
				const { data: filteredCompanies } = await API.post(APIEndpoints.company.search, {
					tags: IOptionToId(tagsSelected)
				})
				dispatch('search', filteredCompanies)
                console.log(filteredCompanies)
			}}
		>
			Buscar
		</button>
	</div>
</main>

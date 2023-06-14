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
	export let domainToFilter: string

	const dispatch = createEventDispatcher()

	let tagsSelected: IOption[] = []

	let endpoint: {
		getAll: string
		search: string
	}
	switch (domainToFilter) {
		case 'company':
			endpoint = {
				getAll: APIEndpoints.company.getAll,
				search: APIEndpoints.company.search
			}
			break
		case 'person':
			endpoint = {
				getAll: APIEndpoints.person.getAll,
				search: APIEndpoints.person.search
			}
			break
		default:
			break
	}

	async function getFilteredByTags(tags: IOption[]) {
		if (!tags || tags.length === 0) {
			const { data: allCompanies } = await API.get(endpoint?.getAll)
			dispatch('search', allCompanies)
		} else {
			const { data: filteredCompanies } = await API.post(endpoint?.search, {
				tags: IOptionToId(tags)
			})
			filteredCompanies.length === 0
				? alert('Nenhuma empresa encontrada')
				: dispatch('search', filteredCompanies) // TODO change from search to tag_filtered
		}
	}
</script>

{#if domainToFilter}
	<main>
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
				on:click={() => getFilteredByTags(tagsSelected)}
			>
				Buscar
			</button>
		</div>
	</main>
{:else}
	<p>No domain passed to filter..</p>
{/if}

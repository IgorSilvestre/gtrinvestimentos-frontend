<script lang="ts">
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { API } from '$lib/api/apiFetch'
	import { getSelectTagOptions } from '$lib/api/queries/tagQueries'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import { IOptionToId } from '$lib/shared/functions/IOptionToId'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import { textKeys } from '$lib/shared/textKeys'
	import { createEventDispatcher } from 'svelte'
	import Select from 'svelte-select'

	export let domainToFilter: string

	const dispatch = createEventDispatcher()

	let selectTagOptionsPromise: Promise<IOption[]>
	domainToFilter !== textKeys.domains.externalAPI
		? (selectTagOptionsPromise = getSelectTagOptions())
		: null
	
  let tagsSelected: IOption[] = []
	let query = ''

	let endpoint: {
		getAll?: string
		search?: string
		companySearchEngine?: string
	}

	switch (domainToFilter) {
		case textKeys.domains.person:
			endpoint = {
				getAll: APIEndpoints.person.getAll,
				search: APIEndpoints.person.search
			}
			break
		default:
			break
	}

	async function handleSearch(tags: IOption[], query: string) {
		let searchParams: { query?: string; tags?: string[] } = {}
		if (query) searchParams.query = query

		if (tags && tags.length > 0) searchParams.tags = IOptionToId(tags)

		if ((!tags || tags.length === 0) && !query) {
			const { data: all } = await API.get(endpoint?.getAll as string)
			return dispatch('search', all)
		} else if (endpoint.search) {
			const { data: filtered } = await API.post(endpoint?.search, searchParams)
			return filtered.length === 0 ? alert('Nenhuma registro') : dispatch('search', filtered) // TODO change from search to tag_filtered
		}
	}
</script>

{#if domainToFilter}
	<main>
		<label class="text-center block uppercase tracking-wide font-bold" for="name"> Busca </label>
		<div class="flex flex-col md:flex-row items-center justify-center">
			<div class="flex flex-col items-center md:w-1/2">
				<label
					class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="name"
				>
					Texto
				</label>
				<input
					placeholder="Pesquisa geral"
					class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					id="searchText"
					bind:value={query}
					on:keydown={(e) => e.key === 'Enter' && handleSearch(tagsSelected, query)}
				/>
				{#if domainToFilter !== textKeys.domains.externalAPI}
					{#await selectTagOptionsPromise}
						<p>Loading Search...</p>
					{:then selectTagOptions}
						<label
							class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="tags"
						>
							Tags
						</label>
						<Select
							placeholder="Pesquisar por tags"
							items={selectTagOptions}
							multiple
							filter={customSelectFilter}
							bind:value={tagsSelected}
						/>
					{/await}
				{/if}
			</div>
			<div class="flex items-center justify-center md:ml-10 mt-4 md:mt-0">
				<button
					class="btn variant-filled-primary ml-3"
					on:click={() => handleSearch(tagsSelected, query)}
				>
					Buscar
				</button>
			</div>
		</div>
	</main>
{:else}
	<p>No domain passed to filter..</p>
{/if}

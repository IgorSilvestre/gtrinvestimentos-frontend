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
	let query: string = ''

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
				search: '' // APIEndpoints.person.search //TODO make search for person
			}
			break
		default:
			break
	}

	async function handleSearch(tags: IOption[], query: string) {
		console.log('query', query)
		console.log('tags', tags)
		let searchParams: { query?: string; tags?: string[] } = {}
		if (query) searchParams.query = query
		if (tags && tags.length > 0) searchParams.tags = IOptionToId(tags)

		if ((!tags || tags.length === 0) && !query) {
			const { data: all } = await API.get(endpoint?.getAll)
			dispatch('search', all)
		} else {
			const { data: filtered } = await API.post(endpoint?.search, searchParams)
			filtered.length === 0 ? alert('Nenhuma empresa encontrada') : dispatch('search', filtered) // TODO change from search to tag_filtered
		}
	}
</script>

{#if domainToFilter}
	<main>
		<!-- <p class="w-full tracking-wide uppercase text-gray-700 text-2xl font-bold">Busca</p> -->
		<div class="flex flex-col md:flex-row items-center justify-center">
			<div class="flex flex-col items-center md:w-1/2">
				<label
					class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="name"
				>
					Nome
				</label>
				<input
					placeholder="Pesquisar por nome"
					class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					id="name"
					bind:value={query}
				/>
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
					<!-- TODO check if this component can work with validation -->
					<!-- {#if $errors.tags && $touched.tags}
			<div class="text-red-500 text-xs">{$errors.tags}</div>
		  {/if} -->
				{/await}
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

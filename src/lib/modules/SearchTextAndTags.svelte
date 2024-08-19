<script lang="ts">
	import { API } from '$lib/api/apiFetch'
	import { getSelectTagOptions } from '$lib/api/queries/tagQueries'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import type { ISearchParams } from '$lib/interfaces-validation/ISearchParams'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import { createEventDispatcher, onMount } from 'svelte'
	import Select from 'svelte-select'

	export let endpoint: string
	export let query = ''
	export let tags: IOption[] = []
    export let selectTagOptions: any = []

	const dispatch = createEventDispatcher()

    let isLoadingTags = true
    onMount(async () => {
        selectTagOptions = await getSelectTagOptions()
        dispatch('tagsLoaded', selectTagOptions)
        isLoadingTags = false
    })

	export async function handleSearch(endpoint: string, searchParams: ISearchParams) {
		if (tags && tags.length > 0) {
			const tagIds = tags.map((tag) => tag.value.trim())
			searchParams.tags = tagIds
		} else delete searchParams.tags

		try {
			const res = await API.get(
				endpoint + '?' + new URLSearchParams(searchParams as Record<string, string>).toString()
			)
			dispatch('search', {
                data: await res.data,
                params: searchParams
            })
		} catch (err) {
			console.log(err)
			return new Error(JSON.stringify(err))
		}
	}
</script>

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
				on:keydown={(e) => e.key === 'Enter' && handleSearch(endpoint, { tags, query })}
			/>
			{#if isLoadingTags}
				<p>Loading Search...</p>
			{:else}
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
					bind:value={tags}
				/>
			{/if}
		</div>
		<div class="flex items-center justify-center md:ml-10 mt-4 md:mt-0">
			<button
				class="btn variant-filled-primary ml-3"
				on:click={() => handleSearch(endpoint, { tags, query })}
			>
				Buscar
			</button>
		</div>
	</div>
</main>

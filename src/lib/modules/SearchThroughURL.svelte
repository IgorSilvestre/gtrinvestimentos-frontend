<!-- THIS COMPONENT RELOADS THE PAGE -->

<script lang="ts">
	import { getSelectTagOptions } from '$lib/api/queries/tagQueries'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import type { ISearchParams } from '$lib/interfaces-validation/ISearchParams'
	import { convertBase64ToObject, convertObjectToBase64 } from '$lib/shared/functions/convertObjectBase64'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import { getParamsFromURL } from '$lib/shared/functions/getParamsFromURL'
	import { onMount } from 'svelte'
	import Select from 'svelte-select'

	export let query = ''
	export let tags: IOption[] = []
	export let selectTagOptions: any = []

	let isLoadingTags = true
	onMount(async () => {
		selectTagOptions = await getSelectTagOptions()

    const urlParams = getParamsFromURL(window.location.search)
    const params = urlParams ? convertBase64ToObject(urlParams.get('data') as string) : null
    
    if(!params) return isLoadingTags = false

		query = params?.query ?? ''
    if(params.tags && params.tags.length > 0)
		  tags = params.tags?.map((tagId: string) =>
		  	selectTagOptions.find((item: any) => item.value === tagId)
		  )

		isLoadingTags = false
  })

	export async function handleSearch(searchParams: ISearchParams) {
    searchParams.tags = searchParams.tags?.map((tag: any) => tag.value)

		const data = convertObjectToBase64(searchParams)
		history.replaceState(null, '', `${window.location.pathname}?data=${data}`)
		window.location.assign(window.location.href) // This will reload the page
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
				on:keydown={(e) => e.key === 'Enter' && handleSearch({ tags, query })}
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
				on:click={() => handleSearch({ tags, query })}
			>
				Buscar
			</button>
		</div>
	</div>
</main>

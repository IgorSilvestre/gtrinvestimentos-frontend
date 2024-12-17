<script lang="ts">
	import { transitionOptions } from '$lib/config.js'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'
	import { fly } from 'svelte/transition'
	import AssetCard from '$lib/containers/asset/AssetCard.svelte'
	import type { IAssetShow } from '$lib/interfaces-validation/IVAsset'
	import Loader from '$lib/modules/Loader.svelte'
	import { onMount } from 'svelte'
	import { getParamsFromURL } from '$lib/shared/functions/getParamsFromURL'
	import { deepSearchAssetsQuery } from '$lib/api/queries/asset/deepSearchAssetsQuery.js'

	export let data
	let { person } = data

	let assets: IAssetShow[] | undefined | null = undefined
	let isLoadingAssets = true

	let searchInput = ''
  let searchInputElement: HTMLInputElement | null = null

	onMount(async () => {
		isLoadingAssets = true

		const params = getParamsFromURL(window.location.search)
		const query = params ? atob(params.get('query')) : ''

		searchInput = query
    if (searchInputElement) {
			searchInputElement.focus()
		}

		let res
		if (query) {
			res = await deepSearchAssetsQuery({ contact: person._id, $text: { $search: query.split(" ").map(term => `"${term}"`).join(" ") } })
		} else {
			res = await deepSearchAssetsQuery({ contact: person._id })
		}
		assets = await res.data.data ?? null

		isLoadingAssets = false
	})

	let debounceTimeout: number | null = null
	function onInput(event: any) {
		const target = event.target
		const searchInputValue = target.value

		// Clear any existing timeout
		if (debounceTimeout !== null) {
			clearTimeout(debounceTimeout)
		}

		// Set a new timeout to delay the execution
		debounceTimeout = setTimeout(() => {
			const query = btoa(searchInputValue)

			history.replaceState(null, '', `${window.location.pathname}?query=${query}`)
			window.location.assign(window.location.href) // This will reload the page
		}, 600) // ms debounce time
	}

	$: {
		assets
	}
</script>

<main>
	<PersonCard {person} noEdit />
	<div
		class="p-4 bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2"
		in:fly={transitionOptions.defaultFlyEntry}
	>
		<h1 class="text-lg font-bold text-gray-900 mb-2">Negociações em conjunto</h1>
		<div class="p-4">
			<input
				type="text"
				bind:value={searchInput}
				on:input={onInput}
        bind:this={searchInputElement}
				class={`border rounded px-4 py-2 w-full outline-none focus:ring-0`}
				placeholder="buscar"
			/>
		</div>
		{#if assets && assets.length === 0}
			<div class="flex justify-center mx-4 my-2">
				<p>Nenhum ativo encontrado</p>
			</div>
		{:else if isLoadingAssets}
			<div class="flex justify-center mx-4 my-6">
				<Loader />
			</div>
		{:else if assets && assets.length > 0}
			<div class="flex flex-wrap justify-start">
				{#each assets as asset}
					<div class="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
						<span in:fly={transitionOptions.defaultFlyEntry}> <AssetCard {asset} /> </span>
					</div>
				{/each}
			</div>
		{:else}
			<div class="flex justify-center mx-4 my-6">
				<p>Nenhum ativo encontrado</p>
			</div>
		{/if}
	</div>
</main>

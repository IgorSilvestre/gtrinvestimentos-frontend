<script lang="ts">
	import { goto } from '$app/navigation'
	import { transitionOptions } from '$lib/config'
	import AssetCard from '$lib/containers/asset/AssetCard.svelte'
	import type { IAssetShow, IAssetPaginated } from '$lib/interfaces-validation/IVAsset'
	import Loader from '$lib/modules/Loader.svelte'
	import SearchThroughURL from '$lib/modules/SearchThroughURL.svelte'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { getAssetsQuery } from '$lib/api/queries/asset/getAssetsQuery'
	import { getParamsFromURL } from '$lib/shared/functions/getParamsFromURL'
	import { convertBase64ToObject } from '$lib/shared/functions/convertObjectBase64'

	let assetsPaginated: IAssetPaginated
	let assets: IAssetShow[] | undefined | null = undefined

	let currentPage = 1
	let totalPages = 1
	let isLoadingAssets = true

	onMount(async () => {
		isLoadingAssets = true

    const urlParams = getParamsFromURL(window.location.search)
    const params = urlParams ? convertBase64ToObject(urlParams.get('data') as string) : null

		const res = await getAssetsQuery({ search: params, page: currentPage })
		assetsPaginated = await res.data

		assets = assetsPaginated?.data ?? null
		totalPages = assetsPaginated?.totalPages ?? 1

		isLoadingAssets = false
	})

	$: {
		currentPage, assets
	}
</script>

<main>
	<div class="flex justify-end my-2 mx-4">
		<button
			type="button"
			class="text-black bg-green-400 p-2 rounded-2xl"
			on:click={() => goto('/asset/edit')}
		>
			Criar Ativo
		</button>
	</div>
	<div class="p-4">
		<SearchThroughURL />
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
			<p>Não foi possível carregar ativos..</p>
		</div>
	{/if}
</main>

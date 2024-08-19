<script lang="ts">
	import { goto } from '$app/navigation'
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { searchAssetsQuery } from '$lib/api/queries/asset/searchAssetsQuery'
	import { transitionOptions } from '$lib/config'
	import AssetCard from '$lib/containers/asset/AssetCard.svelte'
	import type { ISearchParams } from '$lib/interfaces-validation/ISearchParams'
	import type { IAssetShow, IAssetPaginated } from '$lib/interfaces-validation/IVAsset'
	import Loader from '$lib/modules/Loader.svelte'
	import Pagination from '$lib/modules/Pagination.svelte'
	import SearchTextAndTags from '$lib/modules/SearchTextAndTags.svelte'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	let assetsPaginated: IAssetPaginated
	let assets: IAssetShow[] | undefined | null = undefined

	let SearchTextAndTagsComponent: SearchTextAndTags
	let searchParams: {query?: string, tags?: string[]} = {}
	let isSearchPage = false

	let isLoadingAssets = true
	let currentPage = 1
	let totalPages = 1

    let query: any
    let tags: any
    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);

        searchParams.query = urlParams.get('query') || '';
        searchParams.tags = urlParams.get('tags')?.split(',') || [];

        if (searchParams.query || searchParams.tags.length > 0) {
            isLoadingAssets = true;

            const res = await searchAssetsQuery(searchParams);
            assetsPaginated = await res.json();
            assets = assetsPaginated?.data ?? null;
            totalPages = assetsPaginated?.totalPages ?? 1;
            query = searchParams.query;

            isLoadingAssets = false;
            return
        }

        const res = await searchAssetsQuery();
        assetsPaginated = await res.json();
        assets = assetsPaginated?.data ?? null;
        totalPages = assetsPaginated?.totalPages ?? 1;
        isLoadingAssets = false;
    });

    function handleSearchAssets(event: CustomEvent<{ data: IAssetPaginated; params: ISearchParams }>): void {
        isLoadingAssets = true;

        assetsPaginated = event.detail.data;

        if (assetsPaginated) {
            assets = assetsPaginated.data;
            totalPages = assetsPaginated.totalPages;
        } else {
            assets = null;
        }

        isLoadingAssets = false;

        const params = new URLSearchParams(event.detail.params as Record<string, string>);
        history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    }

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
		<SearchTextAndTags
			bind:this={SearchTextAndTagsComponent}
			on:search={handleSearchAssets}
			endpoint={APIEndpoints.asset.search}
            bind:tags={tags}
            bind:query={query}
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
            <!-- {JSON.stringify(assetsPaginated)} -->
        </div>
    {/each}
</div>
		<!-- <Pagination
			{currentPage}
			{totalPages}
			onPageChange={async (page) => {
				isLoadingAssets = true
				if (isSearchPage) {
					SearchTextAndTagsComponent.handleSearch(APIEndpoints.asset.search, {
						...searchParams,
						page
					})
				} else {
					const assetsRes = await getAssetsQuery({}, page)
					assetsPaginated = await assetsRes.json()
					assets = assetsPaginated?.data
				}
				currentPage = page
				isLoadingAssets = false
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}}
		/> -->
	{:else}
		<div class="flex justify-center mx-4 my-6">
			<p>Não foi possível carregar ativos..</p>
		</div>
	{/if}
</main>

<script lang="ts">
	import { goto } from '$app/navigation'
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { getCompaniesQuery } from '$lib/api/queries/company/getCompanies'
	import { transitionOptions } from '$lib/config'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import type { ISearchParams } from '$lib/interfaces-validation/ISearchParams'
	import type { ICompany, ICompanyPaginated } from '$lib/interfaces-validation/IVCompany'
	import Loader from '$lib/modules/Loader.svelte'
	import Pagination from '$lib/modules/Pagination.svelte'
	import SearchTextAndTags from '$lib/modules/SearchTextAndTags.svelte'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	let companiesPaginated: ICompanyPaginated
	let companies: ICompany[] | undefined | null = undefined

	let SearchTextAndTagsComponent: SearchTextAndTags
	let searchParams = {}
	let isSearchPage = false

	let isLoadingCompanies = true
	let currentPage = 1
	let totalPages = 1

	onMount(async () => {
		const res = await getCompaniesQuery()
		companiesPaginated = await res.json()
		companies = companiesPaginated?.data ?? null
		totalPages = companiesPaginated?.totalPages ?? 1
		isLoadingCompanies = false
	})

	$: {
		currentPage, companies // makes sure pagination and search updates in the HTML
	}

	function handleSearchCompany(
		event: CustomEvent<{ data: ICompanyPaginated; params: ISearchParams }>
	): void {
		isLoadingCompanies = true

		companiesPaginated = event.detail.data

		if (companiesPaginated) {
			companies = companiesPaginated.data
			totalPages = companiesPaginated.totalPages
		} else companies = null

		!isSearchPage ? (currentPage = 1) : null // Reset to the first page after search
		isSearchPage = true

		isLoadingCompanies = false
	}
</script>

<main>
	<div class="flex justify-end my-2 mx-4">
		<button
			type="button"
			class="text-black bg-green-400 p-2 rounded-2xl"
			on:click={() => goto('/company/new')}
		>
			Criar Empresa
		</button>
	</div>
	<div class="p-4">
		<SearchTextAndTags
			bind:this={SearchTextAndTagsComponent}
			on:search={handleSearchCompany}
			endpoint={APIEndpoints.company.search}
		/>
	</div>
	{#if companies && companies.length === 0}
		<div class="flex justify-center mx-4 my-2">
			<p>Nenhuma empresa encontrada</p>
		</div>
	{:else if isLoadingCompanies}
		<div class="flex justify-center mx-4 my-6">
			<Loader />
		</div>
	{:else if companies && companies.length > 0}
		{#each companies as company}
			<a href={`/company/${company._id}`} in:fly={transitionOptions.defaultFlyEntry}>
				<CompanyCard {company} />
			</a>
		{/each}
		<Pagination
			{currentPage}
			{totalPages}
			onPageChange={async (page) => {
				isLoadingCompanies = true
				if (isSearchPage) {
					SearchTextAndTagsComponent.handleSearch(APIEndpoints.company.search, {
						...searchParams,
						page
					})
				} else {
					const companiesRes = await getCompaniesQuery(page)
					companiesPaginated = await companiesRes.json()
					companies = companiesPaginated?.data
				}
				currentPage = page
				isLoadingCompanies = false
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}}
		/>
	{:else}
		<div class="flex justify-center mx-4 my-6">
			<p>Não foi possível carregar empresas..</p>
		</div>
	{/if}
</main>

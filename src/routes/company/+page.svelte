<script lang="ts">
	import { goto } from '$app/navigation'
	import { getCompaniesQuery } from '$lib/api/queries/company/getCompanies'
	import { transitionOptions } from '$lib/config'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import type { ICompany, ICompanyPaginated } from '$lib/interfaces-validation/IVCompany'
	import Loader from '$lib/modules/Loader.svelte'
	import Pagination from '$lib/modules/Pagination.svelte'
	import Search from '$lib/modules/Search.svelte'
	import { ensureArray } from '$lib/shared/functions/ensureArray.js'
	import { textKeys } from '$lib/shared/textKeys'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	let companiesPaginated: ICompanyPaginated
	let companies: ICompany[] | undefined | null = undefined
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

	function handleSearchCompany(event: CustomEvent<ICompanyPaginated>): void {
		isLoadingCompanies = true
		companies = ensureArray(event.detail)
		currentPage = 1 // Reset to the first page after search
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
		<Search on:search={handleSearchCompany} domainToFilter={textKeys.domains.company} />
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
				const companiesRes = await getCompaniesQuery(page)
				companiesPaginated = await companiesRes.json()
				companies = companiesPaginated?.data
				currentPage = page
				isLoadingCompanies = false
			}}
		/>
	{:else}
		<div class="flex justify-center mx-4 my-6">
			<p>Não foi possível carregar empresas..</p>
		</div>
	{/if}
</main>

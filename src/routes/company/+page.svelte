<script lang="ts">
	import { goto } from '$app/navigation'
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { API_URL, transitionOptions } from '$lib/config'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import type { ICompany } from '$lib/interfaces-validation/IVCompany'
	import Loader from '$lib/modules/Loader.svelte'
	import Pagination from '$lib/modules/Pagination.svelte'
	import Search from '$lib/modules/Search.svelte'
	import { ensureArray } from '$lib/shared/functions/ensureArray.js'
	import { getTotalPages } from '$lib/shared/functions/paginationHelper/getTotalPages'
	import { itemsPerPage } from '$lib/shared/stores'
	import { textKeys } from '$lib/shared/textKeys'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	let companies: ICompany[] | undefined = undefined
	let isLoadingCompanies: boolean = true

	onMount(async () => {
		const res = await fetch(API_URL + APIEndpoints.company.getAll)
		companies = ensureArray(await res.json() as ICompany[])
		isLoadingCompanies = false
	})


	let currentPage: number = 1
	let displayedCompanies: ICompany[] = getDisplayedCompanies()
	let totalPages = getTotalPages(companies)

	$: {
		// makes sure pagination and search updates the HTML
		currentPage, companies
		displayedCompanies = getDisplayedCompanies()
		totalPages = getTotalPages(companies)
	}

	// Calculate the range of items to display on the current page
	function getDisplayedCompanies(): ICompany[] {
		const startIndex: number = (currentPage - 1) * $itemsPerPage
		const endIndex: number = startIndex + $itemsPerPage
		return companies?.slice(startIndex, endIndex) ?? []
	}

	function handleSearchCompany(event: CustomEvent<ICompany | ICompany[]>): void {
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
			<p>Nenhuma pessoa encontrada</p>
		</div>
	{:else if isLoadingCompanies}
		<div class="flex justify-center mx-4 my-6">
			<Loader />
		</div>
	{:else}
		{#each displayedCompanies as company}
			<a href={`/company/${company._id}`} in:fly={transitionOptions.defaultFlyEntry}>
				<CompanyCard {company} />
			</a>
		{/each}
		<Pagination
			{currentPage}
			{totalPages}
			onPageChange={(page) => {
				currentPage = page
			}}
		/>
	{/if}
</main>

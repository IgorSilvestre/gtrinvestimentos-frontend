<script lang="ts">
	import { goto } from '$app/navigation'
	import { transitionOptions } from '$lib/config'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import type { ICompany } from '$lib/interfaces-validation/IVCompany'
	import Pagination from '$lib/modules/Pagination.svelte'
	import Search from '$lib/modules/Search.svelte'
	import { ensureArray } from '$lib/shared/functions/ensureArray.js'
	import { getTotalPages } from '$lib/shared/functions/paginationHelper/getTotalPages'
	import { fly } from 'svelte/transition'

	export let data: { companies?: ICompany | ICompany[] }

	let companies: ICompany[] = ensureArray(data.companies)

	let isLoadingCompanies: boolean = companies?.length > 0 ? false : true

	const itemsPerPage: number = 20
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
		const startIndex: number = (currentPage - 1) * itemsPerPage
		const endIndex: number = startIndex + itemsPerPage
		return companies.slice(startIndex, endIndex)
	}

	function handleSearchCompany(event: CustomEvent<ICompany | ICompany[]>): void {
		companies = []
		isLoadingCompanies = true
		companies = ensureArray(event.detail)
		isLoadingCompanies = false
		currentPage = 1 // Reset to the first page after search
	}

	// Handle pagination change
	function handlePageChange(page: number): void {
		currentPage = page
	}
</script>

<main>
	<div class="p-4">
		<Search on:search={handleSearchCompany} domainToFilter="company" />
	</div>
	<div class="flex justify-center py-5">
		<button type="button" class="btn variant-filled-success" on:click={() => goto('/company/new')}>
			Criar Empresa
		</button>
	</div>

	{#if isLoadingCompanies}
		<div class="flex justify-center py-5">
			<p class="text-gray-500">Loading...</p>
		</div>
	{:else if companies.length > 0}
		{#each displayedCompanies as company}
			<a href={`/company/${company._id}`} in:fly={transitionOptions.defaultFlyEntry}>
				<CompanyCard {company} />
			</a>
		{/each}
	{:else}
		<div class="flex justify-center py-5">
			<p class="text-gray-500">No companies found</p>
		</div>
	{/if}

	<!-- Use the Pagination component -->
	<Pagination
		{currentPage}
		{totalPages}
		onPageChange={(page) => {
			currentPage = page
		}}
	/>
</main>

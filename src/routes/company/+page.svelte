<script lang="ts">
	import { goto } from '$app/navigation'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import type { ICompany } from '$lib/interfaces-validation/IVCompany'
	import Search from '$lib/modules/Search.svelte'
	import { ensureArray } from '$lib/shared/functions/ensureArray.js'
	import { transitionOptions } from '$lib/shared/transitionOptions.js'
	import { fly } from 'svelte/transition'

	export let data: { companies?: ICompany | ICompany[] }

	let companies: ICompany[] = ensureArray(data.companies)

	let isLoadingCompanies: boolean = companies?.length > 0 ? false : true


	const itemsPerPage: number = 20
	let currentPage: number = 1
	let displayedCompanies: ICompany[] = getDisplayedCompanies()
	let totalPages = getTotalPages()
	$: {
		currentPage, companies // makes sure pagination and search works
		displayedCompanies = getDisplayedCompanies()
		totalPages = getTotalPages()
	}
	// TODO MAKE PAGINATION COMPONENT

	// Calculate the range of items to display on the current page
	function getDisplayedCompanies(): ICompany[] {
		const startIndex: number = (currentPage - 1) * itemsPerPage
		const endIndex: number = startIndex + itemsPerPage
		return companies.slice(startIndex, endIndex)
	}

	function handleSearchCompany(event: CustomEvent<ICompany | ICompany[]>): void {
		companies = []
		console.log('companies', companies)
		isLoadingCompanies = true
		companies = ensureArray(event.detail)
		isLoadingCompanies = false
		currentPage = 1 // Reset to the first page after search
	}

	// Pagination event handlers
	function goToPage(page: number): void {
		if (page >= 1 && page <= getTotalPages()) {
			currentPage = page
		}
	}

	function goToPreviousPage(): void {
		if (currentPage > 1) {
			currentPage--
		}
	}

	function goToNextPage(): void {
		if (currentPage < getTotalPages()) {
			currentPage++
		}
	}

	// Helper function to calculate the total number of pages
	function getTotalPages(): number {
		return Math.ceil(companies.length / itemsPerPage)
	}
</script>

<main>
	<div class="p-4">
		<Search on:search={handleSearchCompany} domainToFilter="company" />
	</div>
	<div class="flex justify-center py-5">
		<button type="button" class="btn variant-filled-success" on:click={() => goto('/company/new')}
			>Criar Empresa</button
		>
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

	<!-- Pagination controls -->
	<div class="flex justify-center py-5">
		<button type="button" class="btn" on:click={() => goToPage(1)}>Primeira</button>
		<button type="button" class="btn" on:click={goToPreviousPage} disabled={currentPage === 1}
			>Anterior</button
		>
		<p class="flex items-center justify-center"> - Página {currentPage} de {totalPages} - </p>
		<button
			type="button"
			class="btn"
			on:click={goToNextPage}
			disabled={currentPage === totalPages}>Próxima</button
		>
		<button type="button" class="btn" on:click={() => goToPage(totalPages)}>Última</button>
	</div>
</main>

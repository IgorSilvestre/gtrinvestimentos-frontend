<script lang="ts">
	import { goto } from '$app/navigation'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import type { ICompany } from '$lib/interfaces-validation/IVCompany.js'
	import TagSearch from '$lib/modules/TagSearch.svelte'
	import { ensureArray } from '$lib/shared/functions/ensureArray'
	import { transitionOptions } from '$lib/shared/transitionOptions.js'
	import { fly } from 'svelte/transition'

	export let data
	
	let companyOrCompanies = data.companies || {}
	let companies = companyOrCompanies instanceof Array ? companyOrCompanies : [companyOrCompanies]
	
	let isLoadingCompanies = companies?.length > 0 ? false : true
	
	function handleSearchCompany(event: CustomEvent<ICompany | ICompany[]>) {
		companies = []
		console.log('companies', companies)
		isLoadingCompanies = true
		companies = ensureArray(event.detail)
		isLoadingCompanies = false
	}
</script>

<main>
	<div class="p-4">
		<TagSearch on:search={handleSearchCompany} domainToFilter="company" />
	</div>
	<div class="flex justify-center py-5">
		<button type="button" class="btn variant-filled-primary" on:click={() => goto('/company/new')}
			>Criar Empresa</button
		>
	</div>
	{#if isLoadingCompanies}
		<div class="flex justify-center py-5">
			<p class="text-gray-500">Loading...</p>
		</div>
	{:else if companies.length > 0}
		{#each companies as company}
			<a href={`/company/${company._id}`} in:fly={transitionOptions.defaultFlyEntry}>
				<CompanyCard {company} />
			</a>
		{/each}
	{:else}
		<div class="flex justify-center py-5">
			<p class="text-gray-500">No companies found</p>
		</div>
	{/if}
</main>

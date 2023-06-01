<script lang="ts">
	import { goto } from '$app/navigation'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
  import type { ICompany } from '$lib/interfaces-validation/IVCompany.js'
	import TagSearch from '$lib/modules/TagSearch.svelte'
  import { ensureArray } from '$lib/shared/functions/ensureArray'

	export let data

	let companyOrCompanies = data.companies || {}
	let companies = companyOrCompanies instanceof Array ? companyOrCompanies : [companyOrCompanies]

	function handleSearchCompany (event: CustomEvent<ICompany | ICompany[]>) {
		const filteredCompanies = event.detail
		companies = ensureArray(filteredCompanies)
	}

</script>

<main>
	<div class="p-4">
		<TagSearch on:search={handleSearchCompany} />
	</div>
	<div class="flex justify-center py-5">
		<button type="button" class="btn variant-filled-primary" on:click={() => goto('/company/new')}
			>Criar Empresa</button
		>
	</div>
	{#if companies.length > 0}
		{#each companies as company}
			<a href={`/company/${company._id}`}>
				<CompanyCard {company} />
			</a>
		{/each}
	{:else}
		<div class="flex justify-center py-5">
			<p class="text-gray-500">No companies found</p>
		</div>
	{/if}
</main>

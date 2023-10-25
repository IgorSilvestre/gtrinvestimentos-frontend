<script lang="ts">
	import Search from '$lib/modules/Search.svelte'
	import { textKeys } from '$lib/shared/textKeys'
	import type { ICompanySearchEngineData } from '$lib/interfaces-validation/ICompanySearchEngineData'
	import Loader from '$lib/modules/Loader.svelte'
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { getDomainFromURL } from '$lib/shared/functions/getDomainFromURL'
	import { isValidURL } from '$lib/shared/functions/isValidURL'

	let isLoadingCompanies: boolean
	let companies: ICompanySearchEngineData[]

	function handleGetLogo(url: string) {
		if (!isValidURL(url)) return
		return APIEndpoints.externalAPI.getLogoByDomain + getDomainFromURL(url)
	}

	function handleSearch(event: CustomEvent<ICompanySearchEngineData[]>): void {
		isLoadingCompanies = true
		companies = event.detail
		isLoadingCompanies = false
	}
</script>

<main>
	<div class="mt-4">
		<Search on:search={handleSearch} domainToFilter={textKeys.domains.externalAPI} />
	</div>
	<div class="w-full">
		{#if isLoadingCompanies}
			<Loader />
		{:else if companies}
			<div class="mt-4 p-4">
				{#each companies as company (company.full_address)}
					<div class="p-4 mb-2 flex">
						{#if isValidURL(company.website)}
							<img
								src={handleGetLogo(company.website)}
								alt={company.name + ' logo'}
								class="w-28 h-28 mr-4 rounded"
							/>
						{:else}
							<span class="w-28 mr-4" />
						{/if}
						<div>
							<h1 class="text-xl text-blue-600 font-semibold">{company.name}</h1>
							{#if company.type}
								<p class="text-gray-600">Setor: {company.type}</p>
							{/if}
							{#if company.full_address}
								<p class="text-gray-600">{company.full_address}</p>
							{/if}
							{#if company.website}
								<a href={company.website}>
									<p class="text-blue-400">{company.website}</p>
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>

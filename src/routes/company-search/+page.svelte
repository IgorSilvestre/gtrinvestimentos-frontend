<script lang="ts">
	import type { ICompanySearchEngineData } from '$lib/interfaces-validation/ICompanySearchEngineData'
	import Loader from '$lib/modules/Loader.svelte'
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { getDomainFromURL } from '$lib/shared/functions/getDomainFromURL'
	import { isValidURL } from '$lib/shared/functions/isValidURL'
	import { goto } from '$app/navigation'
	import SearchByEndpoint from '$lib/modules/SearchByEndpoint.svelte'
	import { API } from '$lib/api/apiFetch'

	let isLoadingCompanies: boolean
	let companies: ICompanySearchEngineData[]
	let query: string

	function handleGetLogo(url: string) {
		if (!isValidURL(url)) return
		return APIEndpoints.externalAPI.getLogoByDomain + getDomainFromURL(url)
	}

	async function handleSearch() {
		const { data } = await API.request(requestOptions)
		console.log(data)
		companies = data
	}

	$: requestOptions = {
		url: APIEndpoints.externalAPI.companySearchEngine + `?query=${query}`
	}
</script>

<main>
	<div class="mt-4">
		<SearchByEndpoint
			placeholder="Pesquise nome ou site da empresa"
			bind:query
			on:search={handleSearch}
		/>
	</div>
	<div class="w-full">
		{#if isLoadingCompanies}
			<Loader />
		{:else if companies}
			<div class="mt-4 p-4">
				{#each companies as company (company.google_id)}
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
							<h1
								on:keydown={(e) => {
									if (e.key === 'Enter')
										goto(`/company-search/${getDomainFromURL(company.website)}`)
								}}
								on:click={(_) => {
									goto(`/company-search/${getDomainFromURL(company.website)}`)
								}}
								class="text-xl text-blue-600 font-semibold cursor-pointer"
							>
								{company.name}
							</h1>
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

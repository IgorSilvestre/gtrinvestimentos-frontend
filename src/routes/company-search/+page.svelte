<script lang="ts">
	import type { ICompanySearchEngineData } from '$lib/interfaces-validation/ICompanySearchEngineData'
	import Loader from '$lib/modules/Loader.svelte'
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { isValidURL } from '$lib/shared/functions/isValidURL'
	import { goto } from '$app/navigation'
	import SearchByEndpoint from '$lib/modules/SearchByEndpoint.svelte'
	import { API } from '$lib/api/apiFetch'
	import { handleGetLogo } from '$lib/api/queries/external/getLogoQuery'
	import type { AxiosResponse } from 'axios'
	import { extractDomainFromString } from '$lib/shared/functions/extractDomainFromString'
	import { PAGE_COMPANY_SEARCH_QUERY, PAGE_COMPANY_SEARCH_RESULTS } from '$lib/shared/stores'
	import { get } from 'svelte/store'

	let query: string = get(PAGE_COMPANY_SEARCH_QUERY)
	let notFoundMessage: string

	let companiesPromise: Promise<AxiosResponse<ICompanySearchEngineData[]>> = get(
		PAGE_COMPANY_SEARCH_RESULTS
	) as Promise<AxiosResponse<ICompanySearchEngineData[]>>

	async function handleSearch() {
		if (!query) return
		const possibleDomain = extractDomainFromString(query)
		if (possibleDomain) goto(`company-search/${encodeURI(possibleDomain)}`)

		PAGE_COMPANY_SEARCH_QUERY.set(query)

		companiesPromise = API.get(APIEndpoints.externalAPI.companySearchEngine + `?query=${query}`)
		PAGE_COMPANY_SEARCH_RESULTS.set(companiesPromise)
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
	<div class="w-full h-full flex justify-center items-center">
		{#await companiesPromise}
			<div class="flex justify-center items-centero">
				<Loader />
			</div>
		{:then companies}
			{#if companies?.data && companies?.data?.length > 0}
				<div class="mt-4 p-4">
					{#each companies.data as company (company.google_id)}
						<div class="p-4 mb-2 flex">
							{#if isValidURL(company.website)}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<img
									src={handleGetLogo(company.website)}
									alt={company.name + ' logo'}
									class="w-28 h-28 mr-4 rounded"
									on:click={(_) => {
										goto(`/company-search/${extractDomainFromString(company.website)}`)
									}}
								/>
							{:else}
								<span class="w-28 mr-4" />
							{/if}
							<div>
								<h1
									on:keydown={company.website ? (e) => {
										if (e.key === 'Enter')
											goto(`/company-search/${extractDomainFromString(company.website)}`)
									} : null}
									on:click={company.website ? (_) => {
										goto(`/company-search/${extractDomainFromString(company.website)}`)
									} : null}
									class={`text-xl font-semibold ${company.website ? "text-blue-600 cursor-pointer" : ""}`}
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
			{:else if notFoundMessage}
				<div class="my-auto m-auto flex justify-center items-center">
					<p class="text-2xl text-gray-600">Nenhuma empresa encontrada..</p>
				</div>
			{/if}
		{/await}
	</div>
</main>

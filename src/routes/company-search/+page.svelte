<script lang="ts">
	import type { ICompanySearchEngineData } from '$lib/interfaces-validation/ICompanySearchEngineData'
	import Loader from '$lib/modules/Loader.svelte'
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { isValidURL } from '$lib/shared/functions/isValidURL'
	import { goto } from '$app/navigation'
	import SearchByEndpoint from '$lib/modules/SearchByEndpoint.svelte'
	import { API } from '$lib/api/apiFetch'
	import { handleGetLogo } from '$lib/api/queries/externalAPis/getLogoQuery'
	import type { AxiosResponse } from 'axios'
	import { extractDomainFromString } from '$lib/shared/functions/extractDomainFromString'

	let query: string

	let companiesPromise: Promise<AxiosResponse<ICompanySearchEngineData[]>>
	let notFoundMessage: string
	async function handleSearch() {
		companiesPromise = API.get(APIEndpoints.externalAPI.companySearchEngine + `?query=${query}`)
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
									on:keydown={(e) => {
										if (e.key === 'Enter')
											goto(`/company-search/${extractDomainFromString(company.website)}`)
									}}
									on:click={(_) => {
										goto(`/company-search/${extractDomainFromString(company.website)}`)
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
			{:else if notFoundMessage}
				<div class="my-auto m-auto flex justify-center items-center">
					<p class="text-2xl text-gray-600">Nenhuma empresa encontrada..</p>
				</div>
			{/if}
		{/await}
	</div>
</main>

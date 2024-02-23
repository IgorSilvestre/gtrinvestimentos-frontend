<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { deepSearchCompanyQuery } from '$lib/api/queries/externalAPis/deepSearchCompanyQuery'
	import CnpjData from '$lib/containers/externalAPI/CNPJData.svelte'
	import LinkedinData from '$lib/containers/externalAPI/LinkedinData.svelte'
	import Loader from '$lib/modules/Loader.svelte'
	import type { ICNPJData } from '$lib/interfaces-validation/ICNPJData'
	import type { ICompanyLinkedinData } from '$lib/interfaces-validation/ICompanyLinkedinData'

	let company: ICompany | undefined
	let validationError: string | undefined
	let isLoading = true
	const companyDomain = $page.params.companyDomain

	interface ICompany {
		CNPJData?: ICNPJData
		linkedinData?: ICompanyLinkedinData
		domainOwner?: {
			name: string
			document: string
		}
	}

	onMount(async () => {
		if (companyDomain) {
			const companyPromise = deepSearchCompanyQuery(companyDomain)
			const fetchedCompany = await companyPromise
			company = fetchedCompany
			isLoading = false
		}
	})
</script>

<main>
	{#if isLoading}
		<div class="mt-10 m-auto flex justify-center items-center">
			<Loader />
		</div>
	{:else if company}
		{#if validationError}
			<div class="my-auto m-auto flex justify-center items-center">
				<p class="text-2xl text-gray-600">{validationError}</p>
			</div>
		{:else}
			{#if company.domainOwner}
				<div class="mx-2 my-4">
					<p><b>Dono do domínio: </b>{company.domainOwner.name}</p>
					<p><b>CPF/CNPJ: </b>{company.domainOwner.document}</p>
					<div class="border border-solid border-black w-1/3" />
				</div>
			{/if}
			<div class="mx-2 my-2">
				<CnpjData data={company.CNPJData} domain={companyDomain} />
			</div>
			<div class="mx-2 mt-2">
				<LinkedinData data={company.linkedinData} />
			</div>
		{/if}
	{:else}
		<div class="my-auto m-auto flex justify-center items-center">
			<p class="text-2xl text-gray-600">Falha ao buscar empresa..</p>
		</div>
	{/if}
</main>

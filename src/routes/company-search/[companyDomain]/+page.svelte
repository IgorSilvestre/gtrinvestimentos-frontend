<script lang="ts">
	import { page } from '$app/stores'
	import { deepSearchCompanyQuery } from '$lib/api/queries/externalAPis/deepSearchCompanyQuery'
	import CnpjData from '$lib/containers/externalAPI/CNPJData.svelte'
	import LinkedinData from '$lib/containers/externalAPI/LinkedinData.svelte'
	import { VCNPJData, type ICNPJData } from '$lib/interfaces-validation/ICNPJData'
	import {
		VCompanyLinkedinData,
		type ICompanyLinkedinData
	} from '$lib/interfaces-validation/ICompanyLinkedinData'
	import Loader from '$lib/modules/Loader.svelte'
	import * as yup from 'yup'

	const companyDomain = $page.params.companyDomain
	const companyPromise = deepSearchCompanyQuery(companyDomain)

	interface ICompany {
		CNPJData: ICNPJData
		linkedinData: ICompanyLinkedinData
	}

	const VCompany = yup.object().shape({
		CNPJData: VCNPJData,
		linkedinData: VCompanyLinkedinData
	})

	let company: ICompany | undefined
	let validationError: string | undefined
</script>

<main>
	{#await companyPromise}
		<div class="mt-10 m-auto flex justify-center items-center">
			<Loader />
		</div>
	{:then fetchedCompany}
		{(company = fetchedCompany)}
		{#if company}
			<script>
				try {
					VCompany.validateSync(company)
				} catch (err) {
					if (err instanceof yup.ValidationError) {
						validationError = err.message
					}
				}
			</script>
			{#if validationError}
				<div class="my-auto m-auto flex justify-center items-center">
					<p class="text-2xl text-gray-600">{validationError}</p>
				</div>
			{:else}
				<div class="ml-2">
					<CnpjData data={company.CNPJData} />
				</div>
				<div class="ml-2">
					<LinkedinData data={company.linkedinData} />
				</div>
			{/if}
		{:else}
			<div class="my-auto m-auto flex justify-center items-center">
				<p class="text-2xl text-gray-600">Falha ao buscar empresa..</p>
			</div>
		{/if}
	{/await}
</main>

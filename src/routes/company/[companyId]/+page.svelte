<script lang="ts">
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import CompanyForm from '$lib/containers/company/CompanyForm.svelte'
	import type { ICompany } from '$lib/interfaces-validation/IVCompany.js'

	export let data
	let { company } = data

	function handleCompanyUpdated(event: CustomEvent<ICompany>) {
		company = event.detail
	}
</script>

<main>
	<CompanyCard {company} noEdit />
	<CompanyForm on:companyUpdated={handleCompanyUpdated} {company} />
</main>

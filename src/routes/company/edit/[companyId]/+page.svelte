<script lang="ts">
	import CompanyForm from '$lib/containers/company/CompanyForm.svelte'

	export let data
	const { company } = data
	console.log(company)
</script>

<main>
	<CompanyForm {company} />
</main>

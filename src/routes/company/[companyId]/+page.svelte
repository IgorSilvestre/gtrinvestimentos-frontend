<script lang='ts'>
	import CompanyCard from '$lib/modules/company/CompanyCard.svelte';
	import CompanyForm from '$lib/modules/company/CompanyForm.svelte';

	export let data
	const { company } = data

</script>

<main>
		<CompanyCard company={company} />
		<CompanyForm company={company} />
</main>

<script lang="ts">
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'

	export let data
	let { company, employees } = data
</script>

<main>
	<CompanyCard {company} />
	<h2 class="text-lg font-medium text-gray-900 mb-2 mx-4">Funcionários:</h2>
	{#each employees as person}
		<PersonCard {person} noEdit />
	{/each}
</main>

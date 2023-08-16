<script lang="ts">
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'

	export let data
	let { company, employees } = data
</script>

<main>
	<CompanyCard {company} />
	{#each employees as person}
		<PersonCard {person} noEdit />
	{/each}
</main>

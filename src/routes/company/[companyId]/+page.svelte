<script lang="ts">
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'

	export let data
	let { company, employees } = data
</script>

<main>
	<CompanyCard {company} />

	{#if employees.length > 0}
		<h2 class="text-lg font-medium text-gray-900 mb-2 mx-4">Funcionários:</h2>
		{#each employees as person}
			<a href="/person/{person._id}">
				<PersonCard {person} noEdit />
			</a>
		{/each}
	{/if}
</main>

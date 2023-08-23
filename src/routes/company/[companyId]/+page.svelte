<script lang="ts">
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'
	import type { IOption } from '$lib/interfaces-validation/IOption.js'
	import type { IEmployee } from '$lib/interfaces-validation/IVCompany.js'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson.js'

	export let data
	const { company, tags } = data
	const employees: IEmployee[] = company.employees || []
	const employeesParsed: IPerson[] = []
	for (const person of employees) {
		const employeeTags: IOption[] = person.tags?.flatMap((tagId: string) =>
			tags.filter((tag) => tag.value === tagId)
		)
		employeesParsed.push({
			...person,
			tags: employeeTags,
			company
		})
	}
</script>

<main>
	<CompanyCard {company} />

	{#if employees.length > 0}
		<h2 class="text-lg font-medium text-gray-900 mb-2 mx-4">Funcionários:</h2>
		{#each employeesParsed as person}
			<a href="/person/{person._id}">
				<PersonCard {person} noEdit />
			</a>
		{/each}
	{/if}
</main>

<script lang="ts">
	import { APIEndpoints } from '$lib/api/apiEndpoints.js'
	import { API } from '$lib/api/apiFetch.js'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'
	import type { IOption } from '$lib/interfaces-validation/IOption.js'
	import Loader from '$lib/modules/Loader.svelte'
	import { onMount } from 'svelte'

	export let data

	let isLoading = false
	let company: any
	let tags: any
	let employeesParsed: any
	let employees: any
	onMount(async () => {
		isLoading = true
		const companyResponse = await API.get(APIEndpoints.company.url_v1 + data.companyId)
		company = await companyResponse.data[0]

		const tagsResponse = await API.get(APIEndpoints.tags.getAllForSelect)
		tags = await tagsResponse.data

		employees = company?.employees || []
		employeesParsed = []
		for (const person of employees) {
			const employeeTags: IOption[] = person?.tags?.flatMap((tagId: string) =>
				tags?.filter((tag: any) => tag.value === tagId)
			)
			employeesParsed.push({
				...person,
				tags: employeeTags,
				company
			})
		}
		isLoading = false
	})
</script>

<main>
	{#if isLoading}
		<div class="flex justify-center mx-4 my-6">
			<Loader />
		</div>
	{:else}
		<CompanyCard {company} />
		{#if employees?.length > 0}
			<h2 class="text-lg font-medium text-gray-900 mb-2 mx-4">Funcionários:</h2>
			{#each employeesParsed as person}
				<a href="/person/{person._id}">
					<PersonCard {person} noEdit />
				</a>
			{/each}
		{/if}
	{/if}
</main>

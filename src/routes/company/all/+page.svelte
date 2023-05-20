<script lang="ts">
	import { goto } from '$app/navigation'
	import CompanyCard from '$lib/containers/company/CompanyCard.svelte'

	export let data

	let companyOrCompanies = data.companies || {}
	let companies = companyOrCompanies instanceof Array ? companyOrCompanies : [companyOrCompanies]
</script>

<main>
	<div class="flex justify-center py-5">
		<button type="button" class="btn variant-filled-primary" on:click={() => goto('/company/new')}
			>Criar Empresa</button
		>
	</div>
	{#if companies.length > 0}
		{#each companies as company}
			<a href={`/company/${company._id}`}>
				<CompanyCard {company} />
			</a>
		{/each}
	{:else}
		<div class="flex justify-center py-5">
			<p class="text-gray-500">No companies found</p>
		</div>
	{/if}
</main>

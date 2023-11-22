<script lang="ts">
	import { page } from '$app/stores'
	import { deepSearchCompanyQuery } from '$lib/api/queries/externalAPis/deepSearchCompanyQuery'
	import JsonToTable from '$lib/modules/JSONToTable.svelte'
	import Loader from '$lib/modules/Loader.svelte'

	const companyDomain = $page.params.companyDomain
	const companyPromise = deepSearchCompanyQuery(companyDomain)
</script>

<main>
	{#await companyPromise}
  <div class="my-auto m-auto flex justify-center items-center">
		<Loader />
  </div>
	{:then company}
		{#if company}
			<JsonToTable data={company} />
		{/if}
	{/await}
</main>

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
  <div class="mt-10 m-auto flex justify-center items-center">
		<Loader />
  </div>
	{:then company}
		{#if company}

			<JsonToTable data={company} />
    {:else}
      <div class="my-auto m-auto flex justify-center items-center">
        <p class="text-2xl text-gray-600">Falha ao buscar empresa..</p>
      </div>
		{/if}
	{/await}
</main>

<script lang="ts">
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { API } from '$lib/api/apiFetch'
	import JsonToTable from '$lib/modules/JSONToTable.svelte'
	import { removeSpecialCharacters } from '$lib/shared/functions/removeSpecialCharacters'

	let cnpjData: unknown = null
	let cnpj: string

	async function handleFetchCNPJData(cnpj: string) {
		try {
			const { data } = await API.get(
				APIEndpoints.externalAPI.fetchCNPJData + removeSpecialCharacters(cnpj)
			)
			cnpjData = data
		} catch (err) {
			console.log(err)
		}
	}

	$: {
		cnpjData
	}
</script>

<main class="mt-4">
	<p class="text-center">
		Caso queira pesquisar o CNPJ clique
		<a href="https://www.diretoriobrasil.net/" class="text-blue-800">aqui</a>
	</p>
	<div class="items-center text-center">
		<label class="text-center block uppercase tracking-wide font-bold" for="name"> Busca </label>
		<!-- <p class="w-full tracking-wide uppercase text-gray-700 text-2xl font-bold">Busca</p> -->
		<div class="flex flex-col md:flex-row items-center justify-center">
			<div class="flex flex-col items-center md:w-1/2">
				<label
					class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="name"
				/>
				<input
					placeholder="Pesquisa geral"
					class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					id="searchText"
					bind:value={cnpj}
					on:keydown={(e) => e.key === 'Enter' && handleFetchCNPJData(cnpj)}
				/>
			</div>
		</div>
	</div>
	<div class="p-4 mt-10">
		{#if cnpjData}
			<JsonToTable data={cnpjData} />
			<!-- {:else}
			<p>Loading...</p> -->
		{/if}
	</div>
</main>

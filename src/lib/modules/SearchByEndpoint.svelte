<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let placeholder = 'Pesquisa geral'
	export let query = ''

  const dispatch = createEventDispatcher()
</script>

<main>
	<label class="text-center block uppercase tracking-wide font-bold" for="name"> Busca </label>
	<div class="flex flex-col md:flex-row items-center justify-center">
		<div class="flex flex-col items-center md:w-1/2 mt-2">
			<input
				{placeholder}
				class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
				type="text"
				id="searchText"
				bind:value={query}
        on:keypress={(e) => e.key === 'Enter' && dispatch('search')}
			/>
		</div>
		<button class="btn variant-filled-primary ml-3" on:click={() => dispatch('search')}> Buscar </button>
	</div>
</main>

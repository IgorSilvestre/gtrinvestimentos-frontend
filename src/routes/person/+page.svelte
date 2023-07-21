<script lang="ts">
	import { goto } from '$app/navigation'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'

	export let data
	const { people } = data
</script>

<main>
	<div class="flex justify-center py-5">
		<button type="button" class="btn variant-filled-success" on:click={() => goto('/person/new')}
			>Criar Pessoa</button
		>
	</div>
	{#each people as person}
		<a href={'person/' + person?._id}>
			<PersonCard {person} />
		</a>
	{/each}
</main>

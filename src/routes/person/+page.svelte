<script lang="ts">
	import PersonCard from '$lib/containers/person/PersonCard.svelte'

	export let data
	const { people } = data
</script>

<main>
	{#each people as person}
		<a href={'person/' + person?._id}>
			<PersonCard {person} />
		</a>
	{/each}
</main>

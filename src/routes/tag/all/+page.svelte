<script lang="ts">
	import TagCardForm from '$lib/modules/tag/TagCardForm.svelte'

	export let data
	let tagOrTags = data.tags || {}
	let tags = tagOrTags instanceof Array ? tagOrTags : [tagOrTags]

	function handleRemoveTag(event: CustomEvent<string>) {
		const tagIdToRemove = event.detail
		tags = tags.filter((tag) => tag._id !== tagIdToRemove)
	}
</script>

<main>
	<div class="flex justify-center py-5">
		<!--    NEW TAG COMPONENT -->
	</div>
	{#if tags}
		{#each tags as tag (tag._id)}
			<TagCardForm {tag} on:remove={handleRemoveTag} />
		{/each}
	{:else}
		<div class="flex justify-center py-5">
			<p class="text-gray-500">Nenhuma tag encontrada..</p>
		</div>
	{/if}
</main>

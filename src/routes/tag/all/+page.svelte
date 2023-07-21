<script lang="ts">
	import TagCardForm from '$lib/containers/tag/TagCardForm.svelte'
	import { testRegexForSearch } from '$lib/shared/functions/testRegexForSearch.js'

	export let data
	let tagOrTags = data.tags || {}
	let tags = tagOrTags instanceof Array ? tagOrTags : [tagOrTags]
	const allTags = tags

	function handleRemoveTag(event: CustomEvent<string>) {
		const tagIdToRemove = event.detail
		tags = tags.filter((tag) => tag._id !== tagIdToRemove)
	}

	function handleFilterTags(event: Event) {
		let target = event?.target as HTMLInputElement
		if (!target?.value) tags = allTags
		tags = tags.filter((tag) =>
			target?.value ? testRegexForSearch(target?.value, tag.label) : true
		)
	}
</script>

<main>
	<div class="flex justify-center">
		<div class="flex flex-col justify-center py-5 w-1/2 self-center">
			<!--    NEW TAG COMPONENT -->
			<label
				class="self-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="name"
			>
				Buscar Tags
			</label>
			<input
				placeholder="Digite para filtrar as tags"
				class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
				type="text"
				id="filterTags"
				on:input={handleFilterTags}
			/>
		</div>
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

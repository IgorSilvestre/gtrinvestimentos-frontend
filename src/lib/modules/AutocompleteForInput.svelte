<script lang="ts">
	import type { IOption } from '$lib/interfaces-validation/IOption'

	export let select = (suggestion: IOption) => {
		console.log('No select function provided', suggestion)
	}
	export let suggestions: IOption[] = []
</script>

{#if suggestions.length > 0}
	<ul class="absolute z-10 bg-white border rounded mt-1 w-full max-h-60 overflow-y-auto">
		{#each suggestions as suggestion}
			<li
				class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
				on:click={() => {
          select(suggestion)
          suggestions = []
        }}
				on:keyup={() => select(suggestion)}
			>
				{suggestion.label}
			</li>
		{/each}
	</ul>
{/if}

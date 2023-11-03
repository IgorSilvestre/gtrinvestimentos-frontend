<script lang="ts">
	import { copyToClipboard } from '$lib/shared/functions/copyToClipboard'

	export let content: string

	let copied = false

	$: {
		content, (copied = false)
	}
</script>

{#if copied}
	<div class="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded">Copiado!</div>
{:else}
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
		on:click={() => {
			copyToClipboard(content)
			copied = true
		}}
	>
		Copiar emails
	</button>
{/if}

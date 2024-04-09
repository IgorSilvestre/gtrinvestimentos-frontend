<script lang="ts">
	import Tag from '../../modules/Tag.svelte'
	import { goto } from '$app/navigation'
	import { fly } from 'svelte/transition'
	import { transitionOptions } from '$lib/config'

	export let asset: any // TODO ! put the correct type here
	export let noEdit = false
</script>

<div
	class="bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2"
	in:fly={transitionOptions.defaultFlyEntry}
>
	<div class="p-4">
		<h2 class="text-lg font-medium text-gray-900">{asset?.name}</h2>
		<div class="flex flex-wrap mb-2">
			{#if asset?.tags && asset?.tags.length > 0}
				{#each asset?.tags as tag}
					<Tag color="primary" name={tag.label} />
				{/each}
			{/if}
		</div>
		{#if asset?.description}
			<p class="text-gray-700 text-sm">
				<span class="font-bold"> Descrição:</span>
				{asset?.description}
			</p>
		{/if}
		{#if asset?.partnerShipPercentage}
			<p class="text-gray-700 text-sm">
				<span class="font-bold"> Descrição:</span>
				{asset?.description}
			</p>
		{/if}
		<!-- {#if asset?.target}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">Target:</span>
				{asset?.target}
			</p>
		{/if} -->
		<div class="flex justify-between">
			<div class="flex flex-col justify-end mt-4">
				<p class="text-gray-600 text-xs">Criação: {asset?.createdAt}</p>
				<p class="text-gray-600 text-xs">Última alteração: {asset?.lastUpdated}</p>
			</div>
			{#if !noEdit}
				<div class="flex justify-end">
					<button
						type="button"
						class="font-bold text-blue-500"
						on:click={(e) => {
							e.preventDefault()
							goto('/asset/edit/' + asset?._id)
						}}
					>
						Editar
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

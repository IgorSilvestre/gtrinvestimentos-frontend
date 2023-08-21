<script lang="ts">
	import Tag from '../../modules/Tag.svelte'
	import { goto } from '$app/navigation'
	import { fly } from 'svelte/transition'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson'
	import { transitionOptions } from '$lib/config'

	export let person: IPerson | undefined
	export let noEdit: boolean = false
</script>

<div
	class="bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2"
	in:fly={transitionOptions.defaultFlyEntry}
>
	<div class="p-4">
		<h2 class="text-lg font-medium text-gray-900 mb-2">{person?.name}</h2>
		<div class="flex flex-wrap mb-2">
			{#if person?.tags}
				{#each person?.tags as tag}
					<Tag color="primary" name={tag.label} />
				{/each}
			{:else}
				<p>Não foram encontradas tags.</p>
			{/if}
		</div>
		{#if person?.company}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">Empresa:</span>
				<a href={'/company/' + person?.company?._id}>
					<Tag color="secondary" name={person?.company?.name} />
				</a>
			</p>
		{/if}
		{#if person?.email}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">Email:</span>
				{person?.email}
			</p>
		{/if}
		{#if person?.target}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">Target:</span>
				{person?.target}
			</p>
		{/if}
		<div class="flex flex-col justify-end mt-4">
			<p class="text-gray-600 text-xs">Criação: {person?.createdAt}</p>
			<p class="text-gray-600 text-xs">Última alteração: {person?.lastUpdated}</p>
		</div>
		{#if !noEdit}
			<div class="flex justify-end">
				<button
					type="button"
					class="text-blue-500 font-bold"
					on:click={(e) => {
						e.preventDefault()
						goto('/person/edit/' + person?._id)
					}}
				>
					Editar
				</button>
			</div>
		{/if}
	</div>
</div>

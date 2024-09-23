<script lang="ts">
	import Tag from '../../modules/Tag.svelte'
	import { goto } from '$app/navigation'
	import { fly } from 'svelte/transition'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson'
	import { toastCopied, transitionOptions } from '$lib/config'
	import { copyToClipboard } from '$lib/shared/functions/copyToClipboard'
	import { formatPhoneNumber } from '$lib/shared/functions/formatPhoneNumber'
	import { toastStore } from '@skeletonlabs/skeleton'
	import { onMount } from 'svelte'

	export let person: IPerson | undefined
	export let noEdit = false
  
  onMount(() => {
    person.phone = formatPhoneNumber(person.phone)
  })

	function handleCopyToClipboard(e: Event, field: string) {
		e.preventDefault()
    switch (field) {
      case 'email':
        copyToClipboard(person?.email as string)
        break
      case 'phone':
        copyToClipboard(person?.phone)
        break
    }
    toastStore.trigger(toastCopied)
	}
</script>

<div
	class="bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2"
	in:fly={transitionOptions.defaultFlyEntry}
>
	<div class="p-4">
		<h2 class="text-lg font-medium text-gray-900 mb-2">{person?.name}</h2>
		<div class="flex flex-wrap mb-2">
			{#if person?.tags && person?.tags.length > 0}
				{#each person?.tags as tag}
					<Tag color="primary" name={tag.label} />
				{/each}
			{/if}
		</div>
		{#if person?.company}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">Empresa:</span>
				<a href={'/company/' + person?.company?._id}>
					<Tag name={person?.company?.name} />
				</a>
			</p>
		{/if}
		{#if person?.email}
			<button
				on:keypress={(e) => handleCopyToClipboard(e, 'email')}
				on:click={(e) => handleCopyToClipboard(e, 'email')}
				class="cursor-pointer flex text-sm"
			>
				<p class="font-bold">Email:  </p>
        <span class="ml-2 text-blue-500">{person?.email}</span>
			</button>
		{/if}
		{#if person?.phone}
			<button
				on:keypress={(e) => handleCopyToClipboard(e, 'phone')}
				on:click={(e) => handleCopyToClipboard(e, 'phone')}
				class="cursor-pointer flex text-sm"
			>
				<p class="font-bold">Telefone:</p>
        <span class="text-blue-500 ml-2">{person?.phone}</span>
			</button>
		{/if}
		{#if person?.target}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">Target:</span>
				{person?.target}
			</p>
		{/if}
		{#if person?.vgv}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">VGV:</span>
				{person?.vgv}
			</p>
		{/if}
		{#if person?.landArea}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">Área do Terreno:</span>
				{person?.landArea}
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

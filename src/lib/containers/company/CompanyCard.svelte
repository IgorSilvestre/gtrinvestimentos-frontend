<script lang="ts">
	import Tag from '../../modules/Tag.svelte'
	import type { ICompany } from '$lib/interfaces-validation/IVCompany'
	import { goto } from '$app/navigation'
	import { fly } from 'svelte/transition'
	import { transitionOptions } from '$lib/config'

	export let company: ICompany | undefined
	export let noEdit = false
</script>

<div
	class="bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2"
	in:fly={transitionOptions.defaultFlyEntry}
>
	<div class="p-4">
		<h2 class="text-lg font-medium text-gray-900">{company?.name}</h2>
		<div class="flex flex-wrap mb-2">
			{#if company?.tags && company?.tags.length > 0}
				{#each company?.tags as tag}
					<Tag color="primary" name={tag.label} />
				{/each}
			{/if}
		</div>
		{#if company?.description}
			<p class="text-gray-700 text-sm">
				<span class="font-bold"> Descrição:</span>
				{company?.description}
			</p>
		{/if}
		{#if company?.target}
			<p class="text-gray-700 text-sm">
				<span class="font-bold">Target:</span>
				{company?.target}
			</p>
		{/if}
		{#if company?.employees && company?.employees.length > 0}
			<div class="flex flex-col mt-1">
				<p class="text-gray-700 text-sm">
					<span class="font-bold">Funcionários:</span>
				</p>
				<div class="flex flex-wrap">
					{#each company?.employees as employee}
						<a href={'/person/' + employee._id}>
							<Tag color="secondary" name={employee.name} />
						</a>
					{/each}
				</div>
			</div>
		{/if}
		<div class="flex justify-between">
			<div class="flex flex-col justify-end mt-4">
				<p class="text-gray-600 text-xs">Criação: {company?.createdAt}</p>
				<p class="text-gray-600 text-xs">Última alteração: {company?.lastUpdated}</p>
			</div>
			{#if !noEdit}
				<div class="flex justify-end">
					<button
						type="button"
						class="font-bold text-blue-500"
						on:click={(e) => {
							e.preventDefault()
							goto('/company/edit/' + company?._id)
						}}
					>
						Editar
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

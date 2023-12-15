<script lang="ts">
	import { API } from '$lib/api/apiFetch'
	import { goto } from '$app/navigation'
	import { createForm } from 'svelte-forms-lib'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson'
	import { VPersonForm } from '$lib/interfaces-validation/IVPerson'
	import Select from 'svelte-select'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import { parseArrayOfOptionsToIds } from '$lib/shared/functions/parseOptionToId'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import { createEventDispatcher } from 'svelte'
	import { toastRegistered, toastUpdated } from '$lib/config'
	import { toastStore } from '@skeletonlabs/skeleton'
	import { searchCompaniesForSelectQuery } from '$lib/api/queries/company/searchCompaniesForSelect'
	import { getSelectTagOptions } from '$lib/api/queries/tagQueries'

	export let person: IPerson | undefined = undefined
	const dispatch = createEventDispatcher()

	let selectTagOptionsPromise: Promise<IOption[]> = getSelectTagOptions()

	interface IPersonForm extends Omit<IPerson, 'tags' | 'company'> {
		tags?: IOption[]
		company?: IOption
	}
	let initialValues: IPersonForm = {
		name: person?.name ?? '',
		email: person?.email ?? '',
		target: person?.target ?? '',
		tags: person?.tags ?? [],
		vgv: person?.vgv,
		landArea: person?.landArea,
		company: person
			? {
					value: person?.company?._id ?? '',
					label: person?.company?.name ?? ''
			  }
			: undefined
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues,
		validationSchema: VPersonForm,
		onSubmit: async (personFormUpdated: IPersonForm) => {
			const normalizedTags: string[] | undefined = parseArrayOfOptionsToIds(personFormUpdated?.tags)
			const personParsed = {
				...personFormUpdated,
				tags: normalizedTags,
				company: personFormUpdated.company?.value
			}

			try {
				person
					? await API.put('person/' + person?._id, personParsed).then((response) => {
							dispatch('personUpdated', response.data)
							toastStore.trigger(toastUpdated)
							goto('/person/' + person?._id)
					  }) // update person
					: await API.post('person', personParsed).then((response) => {
							toastStore.trigger(toastRegistered)
							goto('/person/' + response.data._id)
					  }) // create person
			} catch (error: any) {
				const { clientMessage } = error.response.data.error
				toastStore.trigger({
					message: clientMessage || 'Ocorreu um erro',
					background: 'variant-filled-error'
				})
				console.error(error)
			} finally {
				// alert('Person saved!')
			}
		}
	})
</script>

<div class="bg-white rounded-lg overflow-hidden shadow-lg">
	<div class="p-4">
		<h2 class="text-lg font-medium text-gray-900 mb-2">Criar/Editar Pessoa</h2>
		<form on:submit={handleSubmit}>
			<div class="mb-4">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="name"
				>
					Nome
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					id="name"
					on:input={handleChange}
					bind:value={$form.name}
				/>
				{#if $errors.name}
					<div class="text-red-500 text-xs">{$errors.name}</div>
				{/if}
			</div>
			<div class="mb-4">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="email"
				>
					Email
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="email"
					id="email"
					on:input={handleChange}
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<div class="text-red-500 text-xs">{$errors.email}</div>
				{/if}
			</div>

			<div class="mb-4">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="email"
				>
					Target
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					id="target"
					on:input={handleChange}
					bind:value={$form.target}
				/>
				{#if $errors.target}
					<div class="text-red-500 text-xs">{$errors.target}</div>
				{/if}
			</div>
			<div class="mb-4">
				<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
					Tags
					{#await selectTagOptionsPromise}
						<p>Loading tag options...</p>
					{:then selectTagOptions}
						<Select
							items={selectTagOptions}
							multiple
							filter={customSelectFilter}
							bind:value={$form.tags}
						/>
						<!-- TODO check if this component can work with validation -->
						<!-- {#if $errors.tags && $touched.tags}
                <div class="text-red-500 text-xs">{$errors.tags}</div>
              {/if} -->
					{/await}
				</p>
				<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Companies
					<Select
						debounceWait={300}
						loadOptions={searchCompaniesForSelectQuery}
						itemId="id"
						placeholder="Busque empresa"
					/>
				</p>
			</div>
			<hr class="border-t-2" />
			<h5 class="my-4">Real State</h5>
			<div class="mb-4">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="email"
				>
					VGV
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="number"
					id="vgv"
					min="0"
					on:input={handleChange}
					bind:value={$form.vgv}
				/>
				{#if $errors.vgv}
					<div class="text-red-500 text-xs">{$errors.vgv}</div>
				{/if}
			</div>
			<div class="mb-4">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="email"
				>
					Área do Terreno
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="number"
					id="landArea"
					min="0"
					on:input={handleChange}
					bind:value={$form.landArea}
				/>
				{#if $errors.vgv}
					<div class="text-red-500 text-xs">{$errors.landArea}</div>
				{/if}
			</div>
			<div class="flex justify-end">
				<!-- IF BUTTON IS NOT WORKING - PROBABLY THE VALIDATION IS FAILLING -->
				<button type="submit" class="text-blue-500 font-bold">Salvar</button>
			</div>
		</form>
	</div>
</div>

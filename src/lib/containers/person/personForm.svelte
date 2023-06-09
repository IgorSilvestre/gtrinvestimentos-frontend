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
	import { APIEndpoints } from '$lib/api/apiEndpoints'

	export let person: IPerson | undefined = undefined

	async function getSelectTagOptions() {
		const { data } = await API.get(APIEndpoints.tags.getAllForSelect)
		return data
	}
	let selectTagOptionsPromise: Promise<IOption[]> = getSelectTagOptions()

	interface IPersonForm extends Omit<IPerson, 'tags'> {
		tags?: IOption[]
	}
	let initialValues: IPersonForm = {
		name: person?.name ?? '',
		email: person?.email ?? '',
		tags:
			person?.tags?.map((tag) => ({
				value: tag._id ?? '',
				label: tag.label ?? ''
			})) ?? []
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues,
		validationSchema: VPersonForm,
		onSubmit: async (personFormUpdated: IPersonForm) => {
			const normalizedTags: string[] | undefined = parseArrayOfOptionsToIds(personFormUpdated?.tags)
			const personParsed = {
				...personFormUpdated,
				tags: normalizedTags
			}

			try {
				person
					? await API.put('person/' + person?._id, personParsed).then(() =>
							goto('/person/' + person?._id)
					  ) // update person
					: await API.post('person', personParsed).then((response) =>
							goto('/person/' + response.data._id)
					  ) // create person
			} catch (error) {
				console.error(error)
			} finally {
				// console.log("Person saved");
			}
		}
	})
</script>

<div class="bg-white rounded-lg overflow-hidden shadow-lg">
	<div class="p-4">
		<h2 class="text-lg font-medium text-gray-900 mb-2">Edit Person</h2>
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
				<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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
			</div>
			<div class="flex justify-end">
				<button type="submit" class="btn variant-filled-secondary">Save</button>
			</div>
		</form>
	</div>
</div>

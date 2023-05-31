<script lang="ts">
	import { API } from '$lib/api/apiFetch'
	import { goto } from '$app/navigation'
	import { createForm } from 'svelte-forms-lib'
	import type { ICompany } from '$lib/interfaces-validation/IVCompany'
	import { VCompanyForm } from '$lib/interfaces-validation/IVCompany'
	import Select from 'svelte-select'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson'
	import { parseArrayOfOptionsToIds } from '$lib/shared/functions/parseOptionToId'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import { APIEndpoints } from '$lib/api/apiEndpoints'

	export let company: ICompany | undefined = undefined

	async function getSelectTagOptions() {
		const { data } = await API.get(APIEndpoints.tags.getAllForSelect)
		return data
	}
	let selectTagOptionsPromise: Promise<IOption[]> = getSelectTagOptions()

	async function getSelectPersonOptions() {
		const { data } = await API.get(APIEndpoints.person.getAll)
		return data.map((person: IPerson) => {
			return {
				label: person.name,
				value: person._id
			}
		})
	}
	let selectPersonOptionsPromise: Promise<IOption[]> = getSelectPersonOptions()

	interface ICompanyForm extends Omit<ICompany, 'employees' | 'tags'> {
		employees?: IOption[]
		tags?: IOption[]
	}
	let initialValues: ICompanyForm = {
		name: company?.name ?? '',
		description: company?.description,
		employees:
			company?.employees?.map((employee: IPerson) => ({
				value: employee._id ?? '',
				label: employee.name ?? ''
			})) ?? [],
		target: company?.target,
		tags: company?.tags
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues,
		validationSchema: VCompanyForm,
		onSubmit: async (companyFormUpdated: ICompanyForm) => {
			const normalizedTags: string[] | undefined = parseArrayOfOptionsToIds(
				companyFormUpdated?.tags
			)
			const parsedEmployees: string[] | undefined = parseArrayOfOptionsToIds(
				companyFormUpdated?.employees as IOption[] | undefined
			)
			const companyParsed = {
				...companyFormUpdated,
				tags: normalizedTags,
				employees: parsedEmployees
			}

			try {
				company
					? await API.put('company/' + company?._id, companyParsed).then(() =>
							goto('/company/' + company?._id)
					  ) // update company
					: await API.post('company', companyParsed).then((response) =>
							goto('/company/' + response.data._id)
					  ) // create company
			} catch (error) {
				console.error(error)
			} finally {
				// console.log("Company saved");
			}
		}
	})
</script>

<div class="bg-white rounded-lg overflow-hidden shadow-lg">
	<div class="p-4">
		<h2 class="text-lg font-medium text-gray-900 mb-2">Editar Empresa</h2>
		<form on:submit={handleSubmit}>
			<div class="flex flex-wrap mb-4">
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="target"
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
			<div class="mb-4">
				<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					Funcionários
					{#await selectPersonOptionsPromise}
						<p>Carregando pessoas...</p>
					{:then selectPersonOption}
						<Select
							items={selectPersonOption}
							multiple
							filter={customSelectFilter}
							bind:value={$form.employees}
						/>
					{/await}
				</p>
			</div>
			<div class="mb-4">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="description"
				>
					Descrição
				</label>
				<textarea
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					id="description"
					rows="3"
					on:input={handleChange}
					bind:value={$form.description}
				/>
				{#if $errors.description}
					<div class="text-red-500 text-xs">{$errors.description}</div>
				{/if}
			</div>
			<div class="flex justify-end">
				<button type="submit" class="btn variant-filled-secondary">Salvar</button>
			</div>
		</form>
	</div>
</div>

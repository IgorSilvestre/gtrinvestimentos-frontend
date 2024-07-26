<script lang="ts">
	import { goto } from '$app/navigation'
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { API } from '$lib/api/apiFetch'
	import { getSelectTagOptions } from '$lib/api/queries/tagQueries'
	import { toastRegistered, toastUpdated } from '$lib/config'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import { VAssetForm, type IAsset } from '$lib/interfaces-validation/IVAsset'
	import AddressForm from '$lib/modules/AddressForm.svelte'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import { parseArrayOfOptionsToIds } from '$lib/shared/functions/parseOptionToId'
	import { toastStore } from '@skeletonlabs/skeleton'
	import { createForm } from 'svelte-forms-lib'
	import Select from 'svelte-select'

	export let asset: IAsset | undefined
	let selectTagOptionsPromise: Promise<IOption[]> = getSelectTagOptions()

	interface IAssetForm extends IAsset {}

	let initialValues: IAssetForm = asset ? asset : {
        name: '',
        tags: [],
        priceInReais: 0
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues,
		validationSchema: VAssetForm,
		onSubmit: async (assetFormUpdated: IAssetForm) => {
			const normalizedTags: string[] | undefined = parseArrayOfOptionsToIds(assetFormUpdated?.tags)
			const assetParsed = {
				...assetFormUpdated,
				tags: normalizedTags
			}

			try {
				asset
					? await API.put('asset/' + asset?._id, assetParsed).then(() => {
							toastStore.trigger(toastUpdated)
							goto('/asset/' + asset?._id)
					  }) // update asset
					: await API.post('asset', assetParsed).then((response: any) => {
							toastStore.trigger(toastRegistered)
							goto('/asset/' + response.data._id)
					  }) // create asset
			} catch (error: any) {
				const { clientMessage } = error.response.data.error
				toastStore.trigger({
					message: clientMessage || 'Ocorreu um erro',
					background: 'variant-filled-error'
				})
				console.error(error)
			} finally {
				// console.log("Company saved");
			}
		}
	})
</script>

<main>
	<div class="bg-white rounded-lg overflow-hidden shadow-lg">
		<div class="p-4">
			<h2 class="text-lg font-medium text-gray-900 mb-2">Editar Item</h2>
			<form on:submit={handleSubmit}>
				<div class="flex flex-wrap mb-4">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="imgURL"
						>
							Imagem URL
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="text"
							id="imgURL"
							on:input={handleChange}
							bind:value={$form.imgURL}
						/>
						{#if $errors.imgURL}
							<div class="text-red-500 text-xs">{$errors.imgURL}</div>
						{/if}
					</div>
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
							required
						/>
						{#if $errors.name}
							<div class="text-red-500 text-xs">{$errors.name}</div>
						{/if}
					</div>
				</div>
				<div class="flex flex-wrap mb-4">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="tags"
						>
							Tags
						</label>
						{#await selectTagOptionsPromise}
							<p>Loading tag options...</p>
						{:then selectTagOptions}
							<Select
								items={selectTagOptions}
								multiple
								filter={customSelectFilter}
								bind:value={$form.tags}
							/>
						{/await}
						{#if $errors.tags}
							<div class="text-red-500 text-xs">{$errors.tags}</div>
						{/if}
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="priceInReais"
						>
							Preço em Reais
						</label>
						<input
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="number"
							id="priceInReais"
							on:input={handleChange}
							bind:value={$form.priceInReais}
						/>
						{#if $errors.priceInReais}
							<div class="text-red-500 text-xs">{$errors.priceInReais}</div>
						{/if}
					</div>
				</div>
				<div class="flex justify-end">
					<button type="submit" class="text-blue-500 font-bold">Salvar</button>
				</div>
                <Accordion>
                    <AccordionItem title="Endereço">
                        <svelte:fragment slot="summary">Endereço</svelte:fragment>
                        <svelte:fragment slot="content">
                            <AddressForm />
                        </svelte:fragment>
                    </AccordionItem>
                </Accordion>
            </form>
        </div>
	</div>
</main>


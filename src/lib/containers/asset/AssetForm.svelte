<script lang="ts">
	import { goto } from '$app/navigation'
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
	import { API } from '$lib/api/apiFetch'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import { toastRegistered, toastUpdated } from '$lib/config'
	import { VAssetForm, type IAsset } from '$lib/interfaces-validation/IVAsset'
	import AddressInput from '$lib/modules/AddressInput.svelte'
	import Loader from '$lib/modules/Loader.svelte'
	import { toastStore } from '@skeletonlabs/skeleton'
	import { createForm } from 'svelte-forms-lib'
	import NumberInput from '$lib/modules/NumberInput.svelte'
	import TagInput from '$lib/modules/TagInput.svelte'
	import { getSelectTagOptions } from '$lib/api/queries/tagQueries'
	import { getSelectZoningOptions } from '$lib/api/queries/zoningQueries'
	import AssetCheckIfExistAutocomplete from '$lib/containers/asset/AssetCheckIfExistAutocomplete.svelte'
	import MonthYearPicker from '$lib/modules/MonthYearPicker.svelte'
	import { APIEndpoints } from '$lib/api/apiEndpoints'
	import { FileDropzone } from '@skeletonlabs/skeleton'
	import { searchPersonForSelectQuery_v1 } from '$lib/api/queries/person/searchPersonForSelectQuery_v1'
	import TagInputAsync from '$lib/modules/TagInputAsync.svelte'

	export let asset: IAsset | undefined = undefined
	let selectTagOptionsPromise: Promise<IOption[]> = getSelectTagOptions()
	let selectZoningOptionsPromise: Promise<IOption[]> = getSelectZoningOptions()

	let files: FileList
	let coverImage = asset?.imgURL
	let isSubmitting = false

	delete asset?.createdAt
	delete asset?.updatedAt
	let initialValues: IAsset = asset
		? {
				...asset,
				tags: asset?.tags ? asset.tags.map((tag: any) => tag.value) : [],
				zoning: asset?.zoning ? asset.zoning.map((zoning: any) => zoning._id) : undefined,
				contact: asset?.contact ? asset?.contact._id : undefined
		  }
		: {
				name: '',
				tags: [],
				isForSale: true
		  }

	async function handleContactSearch(e: string): Promise<IOption[]> {
		if (!e) return []
		const contacts = await searchPersonForSelectQuery_v1(e)
		return contacts.map((contact: any) => parseContactToIOption(contact))
	}

	function parseContactToIOption(contact: any): IOption {
		return {
			label: `${contact.name}
              ${contact.company ? ` - ${contact.company.name}` : ''}
              ${
								contact.tags.some((tag: any) => tag.label.match(/parceiro/gi)) ? ' - Parceiro' : ''
							}`,
			value: contact._id
		}
	}

	function removeImage() {
		$form.imgURL = undefined
		coverImage = undefined
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues,
		validationSchema: VAssetForm,
		onSubmit: async (assetFormUpdated: IAsset) => {
			isSubmitting = true
			if (coverImage && files) {
				try {
					const formData = new FormData()
					formData.append('file', files[0])
					const res = await API.post(APIEndpoints.file, formData)
					$form.imgURL = res.data.fileAddress
				} catch (error: any) {
					const { clientMessage } = error.response.data.error
					toastStore.trigger({
						message: clientMessage || 'Ocorreu um erro',
						background: 'variant-filled-error'
					})
					console.error(error)
				}
			}
			try {
				asset
					? await API.put('v1/asset/' + asset?._id, assetFormUpdated).then(() => {
							toastStore.trigger(toastUpdated)
							goto('/asset/' + asset?._id)
					  }) // update asset
					: await API.post('v1/asset', assetFormUpdated).then((response: any) => {
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
				return
			}
			isSubmitting = false
		}
	})

	$: coverImage
</script>

<main>
	<div class="bg-white rounded-lg shadow-lg">
		<div class="p-6">
			<h2 class="text-lg font-medium text-gray-900 mb-4">Editar Ativo</h2>
			<form on:submit={handleSubmit} class="space-y-4">
				<div class="flex">
					<div class="md:w-1/2">
						<div class="w-full px-3 mb-4">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="name">Nome <span class="text-red">*</span></label
							>
							<AssetCheckIfExistAutocomplete bind:name={$form.name} />
							{#if $errors.name}
								<div class="text-red-500 text-xs">{$errors.name}</div>
							{/if}
						</div>
						<div class="w-full px-3 mb-4">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="tags"
							>
								Tags <span class="text-red font-bold">*</span>
							</label>
							<TagInput bind:selected={$form.tags} itemsPromise={selectTagOptionsPromise} />
							{#if $errors.tags}
								<div class="text-red-500 text-xs">{$errors.tags}</div>
							{/if}
						</div>
						<div class="w-full px-3 mb-4">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="docLink">Link Drive</label
							>
							<input
								class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
								type="text"
								id="docLink"
								on:input={handleChange}
								bind:value={$form.docLink}
							/>
							{#if $errors.docLink}
								<div class="text-red-500 text-xs">{$errors.docLink}</div>
							{/if}
						</div>
						<div class="flex justify-between px-3 mb-2">
							<div class="w-full md:w-2/3">
								<label
									class="block uppercase tracking-wide mb-2 text-gray-700 text-xs font-bold"
									for="priceInReais">Preço R$</label
								>
								<NumberInput bind:value={$form.priceInReais} />
								{#if $errors.priceInReais}
									<div class="text-red-500 text-xs">{$errors.priceInReais}</div>
								{/if}
							</div>
							<div class="flex items-center">
								<label
									class="uppercase mx-4 text-gray-700 text-xs cursor-pointer font-bold"
									for="isForSale">Esta a venda</label
								>
								<input
									class="cursor-pointer"
									type="checkbox"
									id="isForSale"
									on:input={handleChange}
									bind:checked={$form.isForSale}
								/>
								{#if $errors.isForSale}
									<div class="text-red-500 text-xs">{$errors.isForSale}</div>
								{/if}
							</div>
						</div>
						<div class="w-full px-3 mb-4">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold md:mb-2"
								for="description">Descrição</label
							>
							<input
								class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								type="text"
								id="description"
								on:input={handleChange}
								bind:value={$form.description}
							/>
							{#if $errors.description}
								<div class="text-red-500 text-xs">{$errors.description}</div>
							{/if}
						</div>
						<div class="w-full px-3 mb-4">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold md:mb-2"
								for="contact">Parceiro</label
							>
							<TagInputAsync
								bind:selected={$form.contact}
								loadOptions={handleContactSearch}
								initialValues={asset?.contact
									? { label: asset?.contact?.name, value: asset?.contact?._id }
									: undefined}
							/>
							{#if $errors.contact}
								<div class="text-red text-xs">{$errors.contact}</div>
							{/if}
						</div>
					</div>
					<div class="w-full block md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="name">Imagem</label
						>
						{#if coverImage}
							<div class="relative group w-full">
								<img
									src={coverImage}
									alt="Imagem do ativo"
									class="w-full h-full object-cover"
									on:click={removeImage}
									on:keyup={removeImage}
								/>
								<span
									class="absolute inset-0 flex items-center justify-center bg-red bg-opacity-10 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
									on:click={removeImage}
									on:keyup={removeImage}
								>
									DELETAR
								</span>
							</div>
						{:else}
							<FileDropzone
								name="cover_image"
								accept="image/png, image/jpeg, image/heic, image/webp"
								class="h-full border border-gray-200"
								on:change={() => (coverImage = URL.createObjectURL(files[0]))}
								bind:files
							>
								<svelte:fragment slot="message"
									><span class="font-bold">Adicione </span>uma imagem</svelte:fragment
								>
								<svelte:fragment slot="meta">png, jpeg, heic, webp</svelte:fragment>
							</FileDropzone>
						{/if}
					</div>
				</div>
				<!-- Accordion for different sections -->
				<Accordion>
					<AccordionItem title="Imobiliário">
						<svelte:fragment slot="summary"
							><span class="font-bold">Imobiliário</span></svelte:fragment
						>
						<svelte:fragment slot="content">
							<div class="flex flex-wrap">
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="landAreaM2">Área do Terreno m²</label
									>
									<NumberInput bind:value={$form.landAreaM2} />
									{#if $errors.landAreaM2}
										<div class="text-red-500 text-xs">{$errors.landAreaM2}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="constructedAreaM2">Área Construida m²</label
									>
									<NumberInput bind:value={$form.constructedAreaM2} />
									{#if $errors.constructedAreaM2}
										<div class="text-red-500 text-xs">{$errors.constructedAreaM2}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="areaAmbiental">Área Ambiental %</label
									>
									<NumberInput bind:value={$form.environmentalAreaPercentage} max={100} />
									{#if $errors.environmentalAreaPercentage}
										<div class="text-red-500 text-xs">{$errors.environmentalAreaPercentage}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="capRatePercentage">Cap Rate % a.a.</label
									>
									<NumberInput bind:value={$form.capRatePercentage} max={100} />
									{#if $errors.capRatePercentage}
										<div class="text-red-500 text-xs">{$errors.capRatePercentage}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="capRatePercentage">Aluguel Mensal R$</label
									>
									<NumberInput bind:value={$form.monthlyRentInReais} />
									{#if $errors.monthlyRentInReais}
										<div class="text-red-500 text-xs">{$errors.monthlyRentInReais}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="partnershipPercentage">Parceria %</label
									>
									<NumberInput bind:value={$form.partnershipPercentage} max={100} />
									{#if $errors.partnershipPercentage}
										<div class="text-red-500 text-xs">{$errors.partnershipPercentage}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="tenant">Locatário</label
									>
									<input
										class="appearance-none block w-full mb-2 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
										type="text"
										id="tenant"
										on:input={handleChange}
										bind:value={$form.tenant}
									/>
									{#if $errors.tenant}
										<div class="text-red-500 text-xs">{$errors.tenant}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="contractTerm">Prazo do Contrato</label
									>
									<div class="flex items-center">
										<MonthYearPicker bind:date={$form.contractTerm} />
									</div>
								</div>
								<div class="flex items-center md:mb-0 mb-6">
									<label
										class="uppercase mx-4 text-gray-700 text-xs font-bold"
										for="isAtypicalContract">Contrato Atípico</label
									>
									<input
										class=""
										type="checkbox"
										id="isAtypicalContract"
										on:input={handleChange}
										bind:checked={$form.isAtypicalContract}
									/>
									{#if $errors.isAtypicalContract}
										<div class="text-red-500 text-xs">{$errors.isAtypicalContract}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="vgvInReais">VGV R$</label
									>
									<NumberInput bind:value={$form.vgvInReais} />
									{#if $errors.vgvInReais}
										<div class="text-red-500 text-xs">{$errors.vgvInReais}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="zoning">Zoneamento</label
									>
									<TagInput
										bind:selected={$form.zoning}
										itemsPromise={selectZoningOptionsPromise}
									/>
								</div>
							</div>
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem title="Galpão">
						<svelte:fragment slot="summary"><span class="font-bold">Galpão</span></svelte:fragment>
						<svelte:fragment slot="content">
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="kmFromSP">KM de SP</label
								>
								<NumberInput bind:value={$form.kmFromSP} />
								{#if $errors.kmFromSP}
									<div class="text-red-500 text-xs">{$errors.kmFromSP}</div>
								{/if}
							</div>
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem title="M&A">
						<svelte:fragment slot="summary"><span class="font-bold">M&A</span></svelte:fragment>
						<svelte:fragment slot="content">
							<div class="flex flex-wrap">
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="anualRevenueInReais">Faturamento Anual R$</label
									>
									<NumberInput bind:value={$form.anualRevenueInReais} />
									{#if $errors.anualRevenueInReais}
										<div class="text-red-500 text-xs">{$errors.anualRevenueInReais}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="valuationPriceInReais">Valor Avaliação Empresa R$</label
									>
									<NumberInput bind:value={$form.valuationPriceInReais} />
									{#if $errors.valuationPriceInReais}
										<div class="text-red-500 text-xs">{$errors.valuationPriceInReais}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="marginEBITDA">Margem EBITDA %</label
									>
									<NumberInput bind:value={$form.marginEBITDA} max={100} allowNegative={true} />
									{#if $errors.marginEBITDA}
										<div class="text-red-500 text-xs">{$errors.marginEBITDA}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="cashOrEquivalentInReais">Caixa ou Equivalente</label
									>
									<NumberInput bind:value={$form.cashOrEquivalentInReais} />
									{#if $errors.cashOrEquivalentInReais}
										<div class="text-red-500 text-xs">{$errors.cashOrEquivalentInReais}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="publicDebtInReais">Dívida Tributária R$</label
									>
									<NumberInput bind:value={$form.publicDebtInReais} />
									{#if $errors.publicDebtInReais}
										<div class="text-red-500 text-xs">{$errors.publicDebtInReais}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="privateDebtInReais">Dívida Privada R$</label
									>
									<NumberInput bind:value={$form.privateDebtInReais} />
									{#if $errors.privateDebtInReais}
										<div class="text-red-500 text-xs">{$errors.privateDebtInReais}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="laborDebtInReais">Dívida Trabalhista R$</label
									>
									<NumberInput bind:value={$form.laborDebtInReais} />
									{#if $errors.laborDebtInReais}
										<div class="text-red-500 text-xs">{$errors.laborDebtInReais}</div>
									{/if}
								</div>
								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="numberOfEmployees">Número de Funcionários</label
									>
									<NumberInput bind:value={$form.numberOfEmployees} />
									{#if $errors.numberOfEmployees}
										<div class="text-red-500 text-xs">{$errors.numberOfEmployees}</div>
									{/if}
								</div>
							</div>
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem title="Energia">
						<svelte:fragment slot="summary"><span class="font-bold">Energia</span></svelte:fragment>
						<svelte:fragment slot="content">
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="ppaInReaisToMWh">PPA</label
								>
								<NumberInput bind:value={$form.ppaInReaisToMWh} />
								{#if $errors.ppaInReaisToMWh}
									<div class="text-red-500 text-xs">{$errors.ppaInReaisToMWh}</div>
								{/if}
							</div>
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="energyOffTaker">Tomador da Energia</label
								>
								<input
									class="appearance-none block w-full mb-2 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
									type="text"
									id="energyOffTaker"
									on:input={handleChange}
									bind:value={$form.energyOffTaker}
								/>
								{#if $errors.energyOffTaker}
									<div class="text-red-500 text-xs">{$errors.energyOffTaker}</div>
								{/if}
							</div>
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="energyInstalledCapacityInMWp">Potência Instalada</label
								>
								<NumberInput bind:value={$form.energyInstalledCapacityInMWp} />
								{#if $errors.energyInstalledCapacityInMWp}
									<div class="text-red-500 text-xs">{$errors.energyInstalledCapacityInMWp}</div>
								{/if}
							</div>
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem title="Projeto">
						<svelte:fragment slot="summary"><span class="font-bold">Projeto</span></svelte:fragment>
						<svelte:fragment slot="content">
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="projectAproveDate">Data de Aprovação</label
								>
								<div class="flex items-center">
									<MonthYearPicker bind:date={$form.projectAproveDate} />
								</div>
								{#if $errors.projectAproveDate}
									<div class="text-red-500 text-xs">{$errors.projectAproveDate}</div>
								{/if}
							</div>
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="constructionStartDate">Inicio da construção</label
								>
								<div class="flex items-center">
									<MonthYearPicker bind:date={$form.constructionStartDate} />
								</div>
								{#if $errors.constructionStartDate}
									<div class="text-red-500 text-xs">{$errors.constructionStartDate}</div>
								{/if}
							</div>
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="capexInReais">Capex de Obra</label
								>
								<NumberInput bind:value={$form.capexInReais} />
								{#if $errors.capexInReais}
									<div class="text-red-500 text-xs">{$errors.capexInReais}</div>
								{/if}
							</div>
						</svelte:fragment>
					</AccordionItem>
					<div class="mb-6">
						<label
							for="address"
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							>Endereço <span class="text-red">*</span></label
						>
						<AddressInput bind:selectedPlace={$form.address} />
						{#if $errors.address}
							<div class="text-red-500 text-xs">{$errors.address}</div>
						{/if}
					</div>
					<div class="flex items-center">
						<label
							for="addressComplement"
							class="block mr-6 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							>Complemento</label
						>
						<input
							class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							type="text"
							id="addressComplement"
							on:input={handleChange}
							bind:value={$form.addressComplement}
						/>
					</div>
				</Accordion>
				<div class="flex justify-end">
					{#if isSubmitting}
						<Loader />
					{:else}
						<button
							type="submit"
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Salvar
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</main>

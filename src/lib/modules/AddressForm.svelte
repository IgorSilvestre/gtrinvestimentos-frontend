<script lang="ts">
	import { getBrazilStates } from '$lib/api/queries/external/locations/getBrazilStates'
	import { createEventDispatcher, onMount } from 'svelte'
	import Select from 'svelte-select'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import { getCitiesByState } from '$lib/api/queries/external/locations/getCitiesByState'
	import { getNeighberhoodByCityApiId } from '$lib/api/queries/external/locations/getNeighberhoodByCityApiId'
	import { getStreetByNeighborhoodApiId } from '$lib/api/queries/external/locations/getStreetByNeighborhoodApiId'

	export let style: string = ''
	export let defaultAddres: any = undefined
    
    const dispatch = createEventDispatcher()

	let states: []
	let isLoadingStates = true
	let cities: []
	let isLoadingCities: boolean
	let neighborhoods: []
	let isLoadingNeighborhoods: boolean
	let streets: []
	let isLoadingStreets: boolean

	const address = defaultAddres ?? {
		street: '',
		city: '',
		state: '',
		neighborhood: '',
		addressComplement: '',
        addressNumber: ''
	}

	onMount(async () => {
		const { result } = await getBrazilStates()
		states = result.map((state: any) => ({
			value: state.shortName,
			label: state.name + ' - ' + state.shortName
		}))
		isLoadingStates = false
	})

    async function dispatchAddress() {
        dispatch('input', address)
    }

	async function handleChangeState(event: any) {
        address.state = event.detail.value
		isLoadingCities = true
		const { result } = await getCitiesByState(event.detail.value)
		cities = result.map((city: any) => ({ value: city.id, label: city.name }))
		isLoadingCities = false
        dispatchAddress()
	}

	async function handleChangeCity(event: any) {
        address.city = event.detail.label
		isLoadingNeighborhoods = true
		const { result } = await getNeighberhoodByCityApiId(event.detail.value)
		neighborhoods = result.map((neighborhood: any) => ({
			value: neighborhood.id,
			label: neighborhood.name
		}))
		isLoadingNeighborhoods = false
        dispatchAddress()
	}

	async function handleChangeNeighborhood(event: any) {
        address.neighborhood = event.detail.label
		isLoadingStreets = true
		const { result } = await getStreetByNeighborhoodApiId(event.detail.value)
		streets = result.map((street: any) => ({ value: street.id, label: street.name }))
		isLoadingStreets = false
        dispatchAddress()
	}

	async function handleChangeStreet(event: any) {
        address.street = event.detail.label
        dispatchAddress()
	}
</script>

<div class={`${style} bg-white rounded-lg overflow-hidden shadow-lg`}>
	<div class="p-4">
		<div class="mb-4">
			<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Estado <span class="text-red-500">*</span></p>
			{#if isLoadingStates}
				<p>Carregando Estados...</p>
			{:else}
				<Select
					items={states}
					on:change={handleChangeState}
					filter={customSelectFilter}
					required
				/>
			{/if}
		</div>
		<div class="mb-4">
			<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Cidade</p>
			{#if isLoadingCities}
				<p>Carregando Cidades...</p>
			{:else}
				<Select
					items={cities}
					on:change={handleChangeCity}
					filter={customSelectFilter}
					disabled={!address.state}
				/>
			{/if}
		</div>
		<div class="mb-4">
			<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Bairro</p>
			{#if isLoadingNeighborhoods}
				<p>Carregando Bairros...</p>
			{:else}
				<Select
					items={neighborhoods}
					on:change={handleChangeNeighborhood}
					filter={customSelectFilter}
					disabled={!address.city}
				/>
			{/if}
		</div>
		<div class="mb-4">
			<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Rua</p>
			{#if isLoadingStreets}
				<p>Carregando Ruas...</p>
			{:else}
				<Select
					items={streets}
                    on:change={handleChangeStreet}
					filter={customSelectFilter}
					disabled={!address.neighborhood}
				/>
			{/if}
		</div>
        <div class="flex flex-col md:flex-row">
		<div class="mb-4 flex items-center justify-between">
			<p class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4">Número</p>
			<input
				class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                on:change={dispatchAddress}
				bind:value={address.addressNumber}
			/>
		</div>
		<div class="mb-4 flex items-center justify-between md:ml-4">
			<p class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4">Complemento</p>
			<input
				class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                on:change={dispatchAddress}
				bind:value={address.addressComplement}
			/>
		</div>

        </div>
	</div>
</div>

<script lang="ts">
	import { getBrazilStates } from '$lib/api/queries/externalAPIs/locations/getBrazilStates'
	import { createEventDispatcher, onMount } from 'svelte'
	import Select from 'svelte-select'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import { getCitiesByState } from '$lib/api/queries/externalAPIs/locations/getCitiesByState'
	import { getNeighberhoodByCityApiId } from '$lib/api/queries/externalAPIs/locations/getNeighberhoodByCityApiId'
	import { getStreetByNeighborhoodApiId } from '$lib/api/queries/externalAPIs/locations/getStreetByNeighborhoodApiId'

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
		neighborhood: ''
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
        dispatch('address', address)
        console.log('dispatch', address)
    }

	async function handleChangeState() {
		isLoadingCities = true
		const { result } = await getCitiesByState(address.state.value)
		cities = result.map((city: any) => ({ value: city.id, label: city.name }))
		isLoadingCities = false
        dispatchAddress()
	}

	async function handleChangeCity() {
		isLoadingNeighborhoods = true
		const { result } = await getNeighberhoodByCityApiId(address.city.value)
		neighborhoods = result.map((neighborhood: any) => ({
			value: neighborhood.id,
			label: neighborhood.name
		}))
		isLoadingNeighborhoods = false
        dispatchAddress()
	}

	async function handleChangeNeighborhood() {
		isLoadingStreets = true
		const { result } = await getStreetByNeighborhoodApiId(address.neighborhood.value)
		streets = result.map((street: any) => ({ value: street.id, label: street.name }))
		isLoadingStreets = false
        dispatchAddress()
	}
</script>

<div class={`${style} bg-white rounded-lg overflow-hidden shadow-lg`}>
	<div class="p-4">
		<h2 class="text-lg font-medium text-gray-900 mb-2">Endereço</h2>
		<div class="mb-4">
			<p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Estado</p>
			{#if isLoadingStates}
				<p>Carregando Estados...</p>
			{:else}
				<Select
					items={states}
					on:change={handleChangeState}
					filter={customSelectFilter}
					bind:value={address.state}
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
					bind:value={address.city}
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
					bind:value={address.neighborhood}
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
                    on:change={dispatchAddress}
					filter={customSelectFilter}
					bind:value={address.street}
					disabled={!address.neighborhood}
				/>
			{/if}
		</div>
		<div class="mb-4 flex items-center">
			<p class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4">Complemento</p>
			<input
				class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                on:change={dispatchAddress}
				bind:value={address.details}
			/>
		</div>
	</div>
</div>


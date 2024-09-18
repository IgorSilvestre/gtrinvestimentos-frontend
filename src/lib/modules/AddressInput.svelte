<script lang="ts">
	import { onMount } from 'svelte'
	import { Loader } from '@googlemaps/js-api-loader'

	export let selectedPlace: string | null = null

	let inputValue = ''
	let suggestions: google.maps.places.AutocompletePrediction[] = []

	let autocompleteService: google.maps.places.AutocompleteService
	let placesService: google.maps.places.PlacesService
	let sessionToken: google.maps.places.AutocompleteSessionToken

	let inputElement: HTMLInputElement

	const API_KEY = <APIKEY>

	onMount(async () => {
		// Load the Google Maps JavaScript API
		const loader = new Loader({
			apiKey: API_KEY,
			libraries: ['places']
		})

		await loader.load()

		// Initialize the AutocompleteService and PlacesService
		autocompleteService = new google.maps.places.AutocompleteService()
		placesService = new google.maps.places.PlacesService(document.createElement('div'))

		// Create a new session token
		refreshSessionToken()
	})

	function refreshSessionToken() {
		sessionToken = new google.maps.places.AutocompleteSessionToken()
	}

	function onInput(event: Event) {
		const target = event.target as HTMLInputElement
		inputValue = target.value

		selectedPlace = null

		if (inputValue === '') {
			suggestions = []
			return
		}

		const request: google.maps.places.AutocompletionRequest = {
			input: inputValue,
			sessionToken: sessionToken
			// Add additional properties like location biasing if needed
		}

		// Fetch autocomplete suggestions
		autocompleteService.getPlacePredictions(request, (predictions, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
				suggestions = predictions
			} else {
				suggestions = []
			}
		})
	}

	function selectPlace(prediction: google.maps.places.AutocompletePrediction) {
		const request: google.maps.places.PlaceDetailsRequest = {
			placeId: prediction.place_id,
			fields: ['name', 'formatted_address', 'geometry'],
			sessionToken: sessionToken
		}

		// Fetch place details
		placesService.getDetails(request, (place, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK && place?.formatted_address) {
				suggestions = []
				selectedPlace = place.formatted_address || ''
				inputValue = place.formatted_address || ''
				refreshSessionToken()
			}
		})
	}
</script>

<div class="relative">
	<input
		type="text"
		bind:this={inputElement}
		value={inputValue}
		on:input={onInput}
		class="border rounded px-4 py-2 w-full"
		placeholder="Adicione um local"
	/>
	{#if suggestions.length > 0}
		<ul class="absolute z-10 bg-white border rounded mt-1 w-full max-h-60 overflow-y-auto">
			{#each suggestions as suggestion}
				<li
					class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
					on:click={() => selectPlace(suggestion)}
				>
					{suggestion.description}
				</li>
			{/each}
		</ul>
	{/if}
</div>

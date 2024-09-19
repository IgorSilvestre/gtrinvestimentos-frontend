<script lang="ts">
	import { getAddressPredictionsQuery } from '$lib/api/queries/external/getAddressPredictionQuery'
	import AutocompleteForInput from '$lib/modules/AutocompleteForInput.svelte'
	import type { IOption } from '$lib/interfaces-validation/IOption'


	export let selectedPlace: string | null = null

	let inputValue = ''
	let suggestions: google.maps.places.AutocompletePrediction[] = []

	async function onInput(event: Event) {
		const target = event.target as HTMLInputElement
		inputValue = target.value

		selectedPlace = null

		if (inputValue === '') {
			suggestions = []
			return
		}

    const { predictions } = await getAddressPredictionsQuery(inputValue)
    suggestions = predictions
	}

	function handleSelectPlace(suggestion: IOption) {
		selectedPlace = suggestion.value || ''
		inputValue = suggestion.label || ''
	}

  $: suggestions = suggestions ? suggestions.map((suggestion) => { return { label: suggestion.description, value: suggestion.description}}) : []
</script>

<div class="relative">
	<input
		type="text"
		value={inputValue}
		on:input={onInput}
		class="border rounded px-4 py-2 w-full"
		placeholder="Adicione um local"
	/>
  <AutocompleteForInput {suggestions} select={handleSelectPlace} />
</div>

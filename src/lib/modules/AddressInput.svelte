<script lang="ts">
	import { getAddressPredictionsQuery } from '$lib/api/queries/external/getAddressPredictionQuery'
	import AutocompleteForInput from '$lib/modules/AutocompleteForInput.svelte'
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import { onMount } from 'svelte'

	export let selectedPlace: string | null = null

	let inputValue = ''
	let suggestions: IOption[] | [] = []

  onMount(() => {
    inputValue = selectedPlace || ''
  })

	async function onInput(event: Event) {
		const target = event.target as HTMLInputElement
		inputValue = target.value

		selectedPlace = null

		if (inputValue === '') {
			suggestions = []
			return
		}

		const { predictions } = await getAddressPredictionsQuery(inputValue)
		suggestions = predictions.map((suggestion) => {
			return { label: suggestion.description, value: suggestion.description }
		})
	}

	function handleSelectPlace(suggestion: IOption) {
		selectedPlace = suggestion.value || ''
		inputValue = suggestion.label || ''
	}
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

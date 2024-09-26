<script lang="ts">
	import { getAddressPredictionsQuery } from '$lib/api/queries/external/getAddressPredictionQuery';
	import AutocompleteForInput from '$lib/modules/AutocompleteForInput.svelte';
	import type { IOption } from '$lib/interfaces-validation/IOption';
	import { onMount } from 'svelte';
	import { debounce } from '$lib/shared/functions/debounce'

	export let selectedPlace: string | null = null;

	let inputValue = '';
	let suggestions: IOption[] = [];

	onMount(() => {
		inputValue = selectedPlace || '';
	});

	// Define the function that fetches suggestions
	async function fetchSuggestions() {
		if (inputValue === '') {
			suggestions = [];
			return;
		}

		const { predictions } = await getAddressPredictionsQuery(inputValue);
		suggestions = predictions.map((suggestion) => ({
			label: suggestion.description,
			value: suggestion.description,
		}));
	}

	const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

	function onInput(event: Event) {
    console.log(typeof setTimeout)
		const target = event.target as HTMLInputElement;
		inputValue = target.value;
		selectedPlace = null;
		suggestions = [];

		debouncedFetchSuggestions();
	}

	function handleSelectPlace(suggestion: IOption) {
		selectedPlace = suggestion.value || '';
		inputValue = suggestion.label || '';
	}
</script>

<div class="relative">
	<input
		type="text"
		bind:value={inputValue}
		on:input={onInput}
		class="border rounded px-4 py-2 w-full"
		placeholder="Adicione um local"
	/>
	<AutocompleteForInput {suggestions} select={handleSelectPlace} />
</div>

<script lang="ts">
	import AutocompleteForInput from '$lib/modules/AutocompleteForInput.svelte';
	import type { IOption } from '$lib/interfaces-validation/IOption';
	import { debounce } from '$lib/shared/functions/debounce'
	import { getAssetsQuery } from '$lib/api/queries/asset/getAssetsQuery'
	import { goto } from '$app/navigation'

	export let name: string | null = null;

	let inputValue = '';
	let suggestions: IOption[] = [];

	// Define the function that fetches suggestions
	async function fetchSuggestions() {
		if (inputValue === '') {
			suggestions = [];
			return;
		}
		const res = await getAssetsQuery({ search: { query: inputValue }});
    const resJson = await res.json()
    const predictions = resJson.data
		suggestions = predictions.map((suggestion) => ({
			label: suggestion.name,
			value: suggestion._id,
		}));
    console.log(suggestions)
	}

	const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

	function onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;
		name = null;
		suggestions = [];

		debouncedFetchSuggestions();
	}

	function handleSelectAsset(suggestion: IOption) {
    goto(`/asset/${suggestion.value}`, { replaceState: true })
	}
</script>

<div class="relative">
	<input
		type="text"
		bind:value={inputValue}
		on:input={onInput}
		class="border rounded px-4 py-2 w-full"
		placeholder="Nome da empresa"
	/>
	<AutocompleteForInput {suggestions} select={handleSelectAsset} />
</div>


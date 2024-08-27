<script lang="ts">
	import type { IOption } from "$lib/interfaces-validation/IOption";
	import { customSelectFilter } from "$lib/shared/functions/filterStringSearch";
	import Select from 'svelte-select';
	import { onMount } from 'svelte';

	export let selected: string[] | undefined = undefined;
	export let itemsPromise: Promise<IOption[]> = Promise.resolve([]);
	export let style: string = '';
  export let placeholder = 'Selecione uma ou mais';

	let componentSelection: IOption[] = [];
	let options: IOption[] = [];
	let isLoading = true;

	// Function to map selected values to the corresponding IOption objects
	function mapSelectedValuesToOptions(selectedValues: string[], options: IOption[]): IOption[] {
		return options.filter(option => selectedValues.includes(option.value));
	}

	// Handle change event to update selected values in the parent component
	function handleChange(event: Event) {
		const changeEvent = new Event('change', { bubbles: true });
		event ? event.target?.dispatchEvent(changeEvent) : null;
    selected = componentSelection.map(option => option.value);
	}

	// Initial setup to fetch options and map selected values
	onMount(async () => {
		try {
			options = await itemsPromise;
			if (selected) {
				componentSelection = mapSelectedValuesToOptions(selected, options);
			}
		} catch (error) {
			console.error('Error loading options:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<main class={style}>
	{#if isLoading}
		<p>Carregando Tags...</p>
	{:else}
		<Select
			items={options}
      {placeholder}
			multiple
			on:change={handleChange}
			filter={customSelectFilter}
			bind:value={componentSelection}
		/>
	{/if}
</main>

<script lang="ts">
	import type { IOption } from "$lib/interfaces-validation/IOption";
	import { customSelectFilter } from "$lib/shared/functions/filterStringSearch";
	import Select from 'svelte-select';
	import { onMount } from 'svelte';

	export let selected: string | string[] | undefined = undefined;
	export let loadOptions: (search: string) => Promise<IOption[]>;
	export let style: string = '';
	export let placeholder: string = 'Digite';
	export let multiple: boolean = false;

	let componentSelection: IOption | IOption[] | undefined;
	let isLoading = true;

	function mapSelectedValuesToOptions(selectedValues: string[], allOptions: IOption[]): IOption[] {
		return allOptions.filter(option => selectedValues.includes(option.value));
	}

	function mapSelectedValueToOption(selectedValue: string, allOptions: IOption[]): IOption | undefined {
		return allOptions.find(option => option.value === selectedValue);
	}

	function handleChange(event: Event) {
		const changeEvent = new Event('change', { bubbles: true });
		event.target?.dispatchEvent(changeEvent);

		if (multiple) {
			const selectionArray = (componentSelection as IOption[]) ?? [];
			selected = selectionArray.map(option => option.value);
		} else {
			const singleOption = componentSelection as IOption | undefined;
			selected = singleOption ? singleOption.value : undefined;
		}
	}

	onMount(async () => {
		try {
			// Load initial options
			const initialOptions = await loadOptions('');
			if (selected !== undefined) {
				if (multiple) {
					const selectedArray = Array.isArray(selected) ? selected : [selected];
					componentSelection = mapSelectedValuesToOptions(selectedArray, initialOptions);
				} else {
					const selectedValue = Array.isArray(selected) ? selected[0] : selected;
					if (selectedValue) {
						componentSelection = mapSelectedValueToOption(selectedValue, initialOptions);
					} else {
						componentSelection = undefined;
					}
				}
			} else {
				componentSelection = multiple ? [] : undefined;
			}
		} catch (error) {
			console.error('Error loading initial options:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<main class={style}>
	{#if isLoading}
		<p>Carregando...</p>
	{:else}
		<Select
			{placeholder}
			{multiple}
			bind:value={componentSelection}
			on:change={handleChange}
			filter={customSelectFilter}
			loadOptions={loadOptions}
		/>
	{/if}
</main>

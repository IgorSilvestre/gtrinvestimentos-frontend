<script lang="ts">
	import type { IOption } from '$lib/interfaces-validation/IOption'
	import { customSelectFilter } from '$lib/shared/functions/filterStringSearch'
	import Select from 'svelte-select'
	import { onMount } from 'svelte'

	export let selected: string | string[] | undefined = undefined
	export let initialValues: IOption | IOption[] | undefined = undefined
	export let loadOptions: (search: string) => Promise<IOption[]>
	export let style: string = ''
	export let placeholder: string = 'Digite'
	export let multiple: boolean = false

	let componentSelection: IOption | IOption[] | undefined = multiple ? [] : undefined
  let isLoading = false

	function handleChange(event: Event) {
		const changeEvent = new Event('change', { bubbles: true })
		event.target?.dispatchEvent(changeEvent)

		if (multiple) {
			const selectionArray = (componentSelection as IOption[]) ?? []
			selected = selectionArray.map((option) => option.value)
		} else {
			const singleOption = componentSelection as IOption | undefined
			selected = singleOption ? singleOption.value : undefined
		}
	}

	onMount(async () => {
		if (!initialValues) return
		componentSelection = initialValues
		isLoading = false
	})
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
			{loadOptions}
		/>
	{/if}
</main>


<script lang="ts">
	import { getSelectTagOptions } from "$lib/api/queries/tagQueries"
	import type { IOption } from "$lib/interfaces-validation/IOption"
	import { customSelectFilter } from "$lib/shared/functions/filterStringSearch"
	import Select from 'svelte-select'
    
    export let selected: string[] | undefined = undefined
    export let style: string = ''
    
    let componentSelection: IOption[] = []
	let selectTagOptionsPromise: Promise<IOption[]> = getSelectTagOptions()

   function handleChange(event: Event) {
    // Force call the default onChange behavior
    const changeEvent = new Event('change', { bubbles: true });
    event ? event.target?.dispatchEvent(changeEvent) : null
  }

    $: selected = componentSelection ? componentSelection.map((tag) => tag.value) : undefined
</script>

<main class={style}>
    {#await selectTagOptionsPromise}
        <p>Carregando Tags...</p>
        {:then options}
        <Select
        items={options}
        multiple
        on:change={handleChange}
        filter={customSelectFilter}
        bind:value={componentSelection}
    />
        {:catch error}
            <p>{error.message}</p>
    {/await}
</main>


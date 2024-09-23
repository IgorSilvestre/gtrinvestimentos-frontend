<script lang="ts">
	import { formatPhoneNumber } from '$lib/shared/functions/formatPhoneNumber'
	import { onMount } from 'svelte'

	export let inputValue = ''
	let displayValue = ''

  onMount(() => {
    displayValue = formatPhoneNumber(inputValue)
  })

	function handleChange(event: Event) {
		const input = (event.target as HTMLInputElement).value
		displayValue = formatPhoneNumber(input)
		inputValue = input ? input.replace(/\D/g, '') : ''
	}
</script>

<input
	type="tel"
	class="appearance-none block text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
	bind:value={displayValue}
	on:input={handleChange}
	placeholder="(XX) XXXXX-XXXX"
	maxlength="15"
/>

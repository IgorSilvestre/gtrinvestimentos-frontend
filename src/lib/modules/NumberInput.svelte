<script lang="ts">
	export let value: number | undefined
	export let max: number | undefined = undefined
	export let allowNegative: boolean = false
	export let onChange: Function | undefined = undefined
	let displayValue: string = ''

	// Function to format the number with punctuation
	function formatNumber(value: number | undefined): string {
		if (value === undefined) return ''
		const isNegative = value < 0
		const absoluteValue = Math.abs(value)
		const formattedValue = absoluteValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
		return isNegative ? `-${formattedValue}` : formattedValue
	}

	// Function to handle input change
	function handleChange(e: Event): void {
		const target = e.target as HTMLInputElement
		let rawValue = target.value

		// Allow leading "-" if allowNegative is true
		if (allowNegative && rawValue === '-') {
			displayValue = rawValue
			value = undefined
			return
		}

		// Preserve the "-" sign if it exists
		const isNegative = allowNegative && rawValue.startsWith('-')
		rawValue = rawValue.replace(/[^0-9]/g, '')

		if (isNegative) {
			rawValue = '-' + rawValue
		}

		if (rawValue === '' || rawValue === '-') {
			value = undefined
			displayValue = rawValue
			return
		}

		let numericValue = parseInt(rawValue, 10)

		// Ensure the value is within the max constraint
		if (!isNaN(numericValue)) {
			if (max !== undefined && Math.abs(numericValue) > max) {
				numericValue = isNegative ? -max : max
			}

			value = numericValue
			displayValue = formatNumber(numericValue)
		} else {
			value = undefined
			displayValue = ''
		}

		if (onChange) onChange()
	}

	$: displayValue = formatNumber(value)
</script>

<input
	class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
	type="text"
	on:input={handleChange}
	bind:value={displayValue}
	min={allowNegative ? undefined : '0'}
	step="0.01"
/>

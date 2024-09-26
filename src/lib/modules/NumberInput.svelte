<script lang="ts">
	export let value: number | undefined
	export let max: number | undefined = undefined
	export let allowNegative: boolean = false
	export let onChange: Function | undefined = undefined
	export let style: string = ''
	let displayValue: string = ''

	function formatNumber(value: number | undefined): string {
		if (value === undefined) return ''

		return value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 20 })
	}

	function handleChange(e: Event): void {
		const target = e.target as HTMLInputElement
		let rawValue = target.value

		if (allowNegative && rawValue === '-') {
			displayValue = rawValue
			value = undefined
			return
		}

		// Preserve the "-" sign if it exists
		const isNegative = allowNegative && rawValue.startsWith('-')
		if (isNegative) {
			rawValue = rawValue.substring(1)
		}

		rawValue = rawValue.replace(/\./g, '').replace(',', '.')
		rawValue = rawValue.replace(/[^0-9.]/g, '')

		if (isNegative) {
			rawValue = '-' + rawValue
		}

		if (rawValue === '' || rawValue === '-') {
			value = undefined
			displayValue = isNegative ? '-' : ''
			return
		}

		let numericValue = parseFloat(rawValue)

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
	class={style +
		' appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'}
	type="text"
	on:input={handleChange}
	bind:value={displayValue}
	min={allowNegative ? undefined : '0'}
	step="0.01"
/>

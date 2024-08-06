<script lang="ts">
    export let value: number | undefined;
    export let max: number | undefined = undefined;
    export let allowNegative: boolean = false;
    let displayValue: string = '';

    // Function to format the number with punctuation
    function formatNumber(value: number | undefined): string {
        if (value === undefined) return '';
        const isNegative = value < 0;
        const absoluteValue = Math.abs(value);
        const formattedValue = absoluteValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return isNegative ? `-${formattedValue}` : formattedValue;
    }

    // Function to handle input change
    function handleChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        const rawValue = target.value.replace(/[^0-9-]/g, '');
        let numericValue = parseInt(rawValue, 10);

        // Ensure the value is within the max constraint
        if (max !== undefined && Math.abs(numericValue) > max) {
            numericValue = allowNegative && numericValue < 0 ? -max : max;
        }

        // Ensure the value is non-negative if allowNegative is false
        if (!allowNegative && numericValue < 0) {
            numericValue = 0;
        }

        value = numericValue;

        if (!isNaN(numericValue)) displayValue = formatNumber(numericValue);
    }

    $: displayValue = formatNumber(value || undefined);
</script>

<input
    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    type="text"
    on:input={handleChange}
    bind:value={displayValue}
    min={allowNegative ? undefined : ""}
    step="0.01"
/>


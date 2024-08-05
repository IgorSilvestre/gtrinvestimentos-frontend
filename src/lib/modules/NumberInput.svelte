<script lang="ts">
    export let value: number | undefined
    export let max: number | undefined = undefined
    let displayValue: string = '';
    
    // Function to format the number with punctuation
    function formatNumber(value: number): string {
        return value.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    // Function to handle input change
    function handleChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        const rawValue = target.value.replace(/\D/g, '');
        let numericValue = parseInt(rawValue, 10);
        if (max !== undefined && numericValue > max) {
            numericValue = max;
        }
        value = numericValue;
        if (!isNaN(numericValue)) displayValue = formatNumber(numericValue);
    }
    $: displayValue = formatNumber(value || 0);
</script>

<input
    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    type="text"
    on:input={handleChange}
    bind:value={displayValue}
    min="0"
    step="0.01"
/>


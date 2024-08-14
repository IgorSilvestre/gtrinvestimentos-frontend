<script lang="ts">
	export let name: string
	export let color:
        | 'blue'
        | 'black'= 'black'
</script>

{#if name}
	<span class={`badge bg-transparent rounded-[5px] border-[1px] border-${color} text-${color} font-bold uppercase text-[10px]`}>{name}</span>
{/if}


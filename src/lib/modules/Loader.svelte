<script lang="ts">
	export let size: string = 'w-12 h-12'

	switch (size) {
		case 'sm':
			size = 'w-6 h-6';	
			break;
		default:
			break;
	}
</script>

<div
	class={`m-6 border-t-4 border-transparent border-solid rounded-full animate-spin ${size} bg-current`}
/>

<style>
	div {
		border-color: currentColor;
		border-top-color: #3498db; /* Default color, can be modified */
	}
</style>

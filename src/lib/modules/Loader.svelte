<script lang="ts">
	export let size = 'w-12 h-12' // default size
</script>

<span
	class={`m-6 border-t-4 border-transparent border-solid rounded-full animate-spin ${size} bg-current`}
/>

<style>
	span {
		border-color: currentColor;
		border-top-color: #3498db; /* Default color, can be modified */
	}
</style>

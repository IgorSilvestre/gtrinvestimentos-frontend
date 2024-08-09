<script lang="ts">
	import AssetFullCard from '$lib/containers/asset/AssetFullCard.svelte'

	export let data
	const { asset } = data
</script>

<main>
	<AssetFullCard {asset} />
</main>

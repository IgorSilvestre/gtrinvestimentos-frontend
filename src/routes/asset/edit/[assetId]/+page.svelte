<script>
	import AssetForm from "$lib/containers/asset/AssetForm.svelte"

	export let data
	const { asset } = data

</script>
<main>
    <AssetForm {asset} />
</main>

<script>
	import AssetForm from "$lib/containers/asset/AssetForm.svelte"

	export let data
	const { asset } = data


    console.log('asset', asset)
</script>
<main>
    <AssetForm {asset} />
</main>

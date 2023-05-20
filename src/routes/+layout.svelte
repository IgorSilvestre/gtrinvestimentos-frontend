<script>
	import Header from './Header.svelte'
	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css'

	import './app.css'
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>Footer HERE</p>
	</footer>
</div>

<style>
</style>

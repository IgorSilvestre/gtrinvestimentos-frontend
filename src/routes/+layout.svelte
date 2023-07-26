<script>
	import Header from './Header.svelte'
	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import { Toast } from '@skeletonlabs/skeleton'

	import './app.css'
</script>

<!-- Skeleton Singletons -->
<Toast />
<!-- --- -->

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<!-- <p>Footer HERE</p> -->
	</footer>
</div>

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



<body class="app">
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    </head>

	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<!-- <p>Footer HERE</p> -->
	</footer>
</body>


<style>
    @font-face {
        font-family: "Calibre Web";
        src: url("https://db.onlinewebfonts.com/t/4a0c1d6164df2c0aa88da1437cd38ef1.eot");
        src: url("https://db.onlinewebfonts.com/t/4a0c1d6164df2c0aa88da1437cd38ef1.eot?#iefix")format("embedded-opentype"),
        url("https://db.onlinewebfonts.com/t/4a0c1d6164df2c0aa88da1437cd38ef1.woff2")format("woff2"),
        url("https://db.onlinewebfonts.com/t/4a0c1d6164df2c0aa88da1437cd38ef1.woff")format("woff"),
        url("https://db.onlinewebfonts.com/t/4a0c1d6164df2c0aa88da1437cd38ef1.ttf")format("truetype"),
        url("https://db.onlinewebfonts.com/t/4a0c1d6164df2c0aa88da1437cd38ef1.svg#Calibre Web")format("svg");
    }

    body {
        font-family: 'Montserrat', sans-serif;
    }
</style>

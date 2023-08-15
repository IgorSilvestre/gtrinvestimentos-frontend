<script lang="ts">
	import { onMount } from 'svelte'

	onMount(() => {
		const links = document.querySelectorAll('nav a')

		links.forEach((link) => {
			link.addEventListener('click', (event) => {
				// event.preventDefault() // Prevent the default link behavior
				updateActiveLink(link as HTMLAnchorElement)
			})
		})

		function updateActiveLink(activeLink: HTMLAnchorElement) {
			links.forEach((link) => {
				if (link === activeLink) {
					link.classList.add('active')
				} else {
					link.classList.remove('active')
				}
			})
		}
	})
</script>

<header>
	<nav class="flex justify-center bg-black py-5">
		<a class="no-underline hover:underline text-white mx-3" href="/">Home</a>
		<!-- TODO standard endpoints -->
		<a class="no-underline hover:underline text-white mx-3" href="/company">Empresas</a>
		<a class="no-underline hover:underline text-white mx-3" href="/tag/all">Tags</a>
		<a class="no-underline hover:underline text-white mx-3" href="/person">Pessoas</a>
	</nav>
</header>

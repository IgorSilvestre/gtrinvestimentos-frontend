<script lang="ts">
	import { onMount } from 'svelte'

	onMount(() => {
		const links = document.querySelectorAll('nav a')

		links.forEach((link) => {
			link.addEventListener('click', () => {
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

	const isMobile =
		typeof window !== 'undefined'
			? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
			: false
</script>

{#if isMobile}
	<a href="/">
		<div class="font-rockwell text-3xl text-center mt-2">gtr.</div>
	</a>
{:else}
	<header class="bg-black py-3 flex justify-center font-calibreweb text-[18px]">
		<span class="font-rockwell text-white text-2xl absolute left-2">gtr.</span>
		<nav class="ml-4">
			<!-- <a class="no-underline hover:underline text-white mx-3" href="/">Home</a> -->
			<!-- TODO standard endpoints -->
			<a class="no-underline hover:underline text-white mx-3" href="/company">Empresas</a>
			<!-- <a class="no-underline hover:underline text-white mx-3" href="/tag/all">Tags</a> -->
			<a class="no-underline hover:underline text-white mx-3" href="/person">Pessoas</a>
			<a class="no-underline hover:underline text-white mx-3" href="/asset">Ativos</a>
			<a class="no-underline hover:underline text-white mx-3" href="/search-cnpj">Busca CNPJ</a>
			<a class="no-underline hover:underline text-white mx-3" href="/company-search"
				>Busca Empresa</a
			>
			<a class="no-underline hover:underline text-white mx-3" href="/utils/verify-email">Busca Email</a>
		</nav>
	</header>
{/if}

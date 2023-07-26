<script lang="ts">
	export let currentPage: number
	export let totalPages: number
	export let onPageChange: (page: number) => void

	function goToPage(page: number): void {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page)
		}
	}

	function goToPreviousPage(): void {
		if (currentPage > 1) {
			onPageChange(currentPage - 1)
		}
	}

	function goToNextPage(): void {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1)
		}
	}
</script>

<nav class="flex justify-center py-5">
	<button type="button" class="btn" on:click={() => goToPage(1)}>Primeira</button>
	<button type="button" class="btn" on:click={goToPreviousPage} disabled={currentPage === 1}
		>Anterior</button
	>
	<p class="flex items-center justify-center">- Página {currentPage} de {totalPages} -</p>
	<button type="button" class="btn" on:click={goToNextPage} disabled={currentPage === totalPages}
		>Próxima</button
	>
	<button type="button" class="btn" on:click={() => goToPage(totalPages)}>Última</button>
</nav>

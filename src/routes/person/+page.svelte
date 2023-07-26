<script lang="ts">
	import { goto } from '$app/navigation'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson.js'
	import Pagination from '$lib/modules/Pagination.svelte'
	import Search from '$lib/modules/Search.svelte'
	import { ensureArray } from '$lib/shared/functions/ensureArray.js'
	import { getTotalPages } from '$lib/shared/functions/paginationHelper/getTotalPages.js'

	export let data
	let people = ensureArray(data.people)

	const itemsPerPage: number = 20;
	let currentPage: number = 1;
	let displayedPeople: IPerson[] = getDisplayedPeople();
	let totalPages = getTotalPages(people);

	$: {
		// makes sure pagination and search updates the HTML
		currentPage, people
		displayedPeople = getDisplayedPeople()
		totalPages = getTotalPages(people)
	}

	// Calculate the range of items to display on the current page
	function getDisplayedPeople(): IPerson[] {
	  const startIndex: number = (currentPage - 1) * itemsPerPage;
	  const endIndex: number = startIndex + itemsPerPage;
	  return people.slice(startIndex, endIndex);
	}

	function handleSearchPeople(event: CustomEvent<IPerson | IPerson[]>): void {
	  people = [];
	  people = ensureArray(event.detail);
	  currentPage = 1; // Reset to the first page after search
	}
</script>

<main>
	<div class="p-4">
		<Search on:search={handleSearchPeople} domainToFilter="person" />
	</div>
	<div class="flex justify-center py-5">
		<button type="button" class="btn variant-filled-success" on:click={() => goto('/person/new')}
			>Criar Pessoa</button
		>
	</div>
	{#each displayedPeople as person}
		<a href={'person/' + person?._id}>
			<PersonCard {person} />
		</a>
	{/each}

	<!-- Use the Pagination component -->
	<Pagination
		{currentPage}
		{totalPages}
		onPageChange={(page) => {
			currentPage = page
		}}
	/>
</main>

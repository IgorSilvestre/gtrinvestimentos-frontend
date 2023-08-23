<script lang="ts">
	import { goto } from '$app/navigation'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson.js'
	import Pagination from '$lib/modules/Pagination.svelte'
	import Search from '$lib/modules/Search.svelte'
	import CopyToClipboardButton from '$lib/modules/copyToClipboardButton.svelte'
	import { ensureArray } from '$lib/shared/functions/ensureArray.js'
	import { getTotalPages } from '$lib/shared/functions/paginationHelper/getTotalPages.js'
	import { itemsPerPage } from '$lib/shared/stores.js'

	export let data
	let people = ensureArray(data.people)

	let currentPage: number = 1
	let displayedPeople: IPerson[] = getDisplayedPeople()
	let totalPages = getTotalPages(people)
	let emailsToCopy: string = ''

	$: {
		// makes sure pagination and search updates the HTML
		currentPage, people
		displayedPeople = getDisplayedPeople()
		totalPages = getTotalPages(people)

		// Copy all emails to clipboard
		people.forEach((person) => {
			emailsToCopy += person.email + '\n'
		})
	}

	// Calculate the range of items to display on the current page
	function getDisplayedPeople(): IPerson[] {
		const startIndex: number = (currentPage - 1) * $itemsPerPage
		const endIndex: number = startIndex + $itemsPerPage
		return people.slice(startIndex, endIndex)
	}

	function handleSearchPeople(event: CustomEvent<IPerson | IPerson[]>): void {
		people = []
		people = ensureArray(event.detail)
		currentPage = 1 // Reset to the first page after search
	}
</script>

<main>
	<div class="flex justify-end mx-4 my-2">
		<button type="button" class="bg-green-400 text-black rounded-2xl p-2" on:click={() => goto('/person/new')}
			>Criar Pessoa</button
		>
	</div>
	<div class="p-4">
		<Search on:search={handleSearchPeople} domainToFilter="person" />
	</div>

	<div class="flex justify-center mx-4 my-2">
		<CopyToClipboardButton content={emailsToCopy} />
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

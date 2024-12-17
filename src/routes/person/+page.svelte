<script lang="ts">
	import { goto } from '$app/navigation'
	import { APIEndpoints } from '$lib/api/apiEndpoints.js'
	import { API } from '$lib/api/apiFetch'
	import PersonCard from '$lib/containers/person/PersonCard.svelte'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson.js'
	import CopyToClipboardButton from '$lib/modules/CopyToClipboardButton.svelte'
	import Loader from '$lib/modules/Loader.svelte'
	import Pagination from '$lib/modules/Pagination.svelte'
	import Search from '$lib/modules/Search.svelte'
	import { ensureArray } from '$lib/shared/functions/ensureArray.js'
	import { getTotalPages } from '$lib/shared/functions/paginationHelper/getTotalPages.js'
	import { ITEMS_PER_PAGE } from '$lib/shared/stores.js'
	import { textKeys } from '$lib/shared/textKeys'
	import { onMount } from 'svelte'

	let people: IPerson[] | undefined = undefined
	onMount(async () => {
		const res = await API.get(APIEndpoints.person.getAll)
		people = ensureArray((await res.data) as IPerson[])
	})

	let currentPage = 1
	let displayedPeople: IPerson[] = getDisplayedPeople()
	let totalPages = getTotalPages(people || [])
	let emailsToCopy = ''

	$: {
		// makes sure pagination and search updates the HTML
		currentPage, people
		displayedPeople = getDisplayedPeople()
		totalPages = getTotalPages(people || [])
	}

	// Calculate the range of items to display on the current page
	function getDisplayedPeople(): IPerson[] {
		const startIndex: number = (currentPage - 1) * $ITEMS_PER_PAGE
		const endIndex: number = startIndex + $ITEMS_PER_PAGE
		return people?.slice(startIndex, endIndex) ?? []
	}

	function handleSearchPeople(event: CustomEvent<IPerson | IPerson[]>): void {
		people = ensureArray(event.detail)
		
		// update copy emails-to-clipboard button
		people?.forEach((person) => {
			person?.email ? (emailsToCopy += person.email + '\n') : null
		})
		
		currentPage = 1 // Reset to the first page after search
	}
</script>

<main>
	<div class="flex justify-end mx-4 my-2">
		<button
			type="button"
			class="p-2 text-black bg-green-400 rounded-2xl"
			on:click={() => goto('/person/new')}>Criar Pessoa</button
		>
	</div>
	<div class="p-4">
		<Search on:search={handleSearchPeople} domainToFilter={textKeys.domains.person} />
	</div>

	<div class="flex justify-center mx-4 my-2">
		<CopyToClipboardButton content={emailsToCopy} />
	</div>

	{#if people && people.length === 0}
		<div class="flex justify-center mx-4 my-2">
			<p>Nenhuma pessoa encontrada</p>
		</div>
	{:else if !people}
		<div class="flex justify-center mx-4 my-6">
			<Loader />
		</div>
	{:else}
		{#each displayedPeople as person}
			<a href={'person/' + person?._id}>
				<PersonCard {person} />
			</a>
		{/each}
		<Pagination
			{currentPage}
			{totalPages}
			onPageChange={(page) => {
				currentPage = page
			}}
		/>
	{/if}
</main>

<script lang="ts">
	import PersonCard from '$lib/containers/person/PersonCard.svelte'
	import PersonForm from '$lib/containers/person/PersonForm.svelte'
	import type { IPerson } from '$lib/interfaces-validation/IVPerson.js'

	export let data
	let { person } = data

	function handlePersonUpdated(event: CustomEvent<IPerson>) {
		console.log(event.detail)
		person = event.detail
	}
</script>

<main>
	<PersonCard {person} noEdit />
	<PersonForm on:personUpdated={handlePersonUpdated} {person} />
</main>

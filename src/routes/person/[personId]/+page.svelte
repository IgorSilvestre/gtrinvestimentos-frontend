<script lang="ts">
  import PersonCard from '$lib/containers/person/PersonCard.svelte'
  import PersonForm from '$lib/containers/person/PersonForm.svelte'

	export let data
	const { person } = data
</script>

<main>
	<PersonCard {person} />
	<PersonForm {person} />
</main>

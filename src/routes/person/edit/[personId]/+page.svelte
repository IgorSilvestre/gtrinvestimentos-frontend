<script lang="ts">
  import PersonForm from '$lib/containers/person/PersonForm.svelte'

	export let data
	const { person } = data
</script>

<main>
	<PersonForm {person} />
</main>

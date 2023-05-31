<script lang="ts">
  import PersonForm from '$lib/containers/person/personForm.svelte'

	export let data
	const { person } = data
</script>

<main>
	<PersonForm {person} />
</main>

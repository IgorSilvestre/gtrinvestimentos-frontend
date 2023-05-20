<script lang="ts">
  import CompanyCard from "$lib/containers/company/CompanyCard.svelte";

  export let data;
  const { company } = data;

</script>

<main>
  <CompanyCard {company} />
</main>

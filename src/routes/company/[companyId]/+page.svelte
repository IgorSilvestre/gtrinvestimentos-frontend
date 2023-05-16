<script lang="ts">
  import CompanyCard from "$lib/modules/company/CompanyCard.svelte";

  export let data;
  const { company } = data;

</script>

<main>
  <CompanyCard {company} />
</main>

<script lang="ts">
  import CompanyCard from "$lib/modules/company/CompanyCard.svelte";
  import NewCompany from "$lib/modules/company/NewCompany.svelte";

  export let data;
  const { companies } = data || {};

</script>

<main>
  <div class="flex justify-center py-5">
    <NewCompany />
  </div>
  {#if companies.length > 0}
    {#each companies as company}
      <a href={`/company/${company._id}`}>
        <CompanyCard {company} />
      </a>
    {/each}
  {:else}
    <div class="flex justify-center py-5">
      <p class="text-gray-500">No companies found</p>
    </div>
  {/if}
</main>

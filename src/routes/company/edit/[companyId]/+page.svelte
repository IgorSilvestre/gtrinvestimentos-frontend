<script lang="ts">
  import CompanyForm from "$lib/modules/company/CompanyForm.svelte";

  export let data;
  const { company } = data;

</script>

<main>
  <CompanyForm {company} />
</main>

<script lang="ts">
  import TagForm from "$lib/modules/tag/TagCardForm.svelte";

  export let data;
  let { tags } = data || {};
  if (!Array.isArray(tags)) tags = [tags];
  console.log(tags);

</script>

<main>
  <div class="flex justify-center py-5">
    <!--    <NewCompany />-->
    <!--    NEW TAG COMPONENT -->
  </div>
  {#if tags.length > 0}
    {#each tags as tag}
      <a href={`/tag/${tag._id}`}>
        <TagForm {tag} />
      </a>
    {/each}
  {:else}
    <div class="flex justify-center py-5">
      <p class="text-gray-500">No tags found</p>
    </div>
  {/if}
</main>

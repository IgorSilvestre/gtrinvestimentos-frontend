<script lang="ts">
  import TagCardForm from "$lib/containers/tag/TagCardForm.svelte";

  export let data;
  let tagOrTags = data.tags || {};
  let tags = tagOrTags instanceof Array ? tagOrTags : [tagOrTags];
  console.log(tags);

</script>

<main>
  <div class="flex justify-center py-5">
    <!--    <NewCompany />-->
    <!--    NEW TAG COMPONENT -->
  </div>
  {#if tags}
    {#each tags as tag}
     <TagCardForm {tag} />
    {/each}
  {:else}
    <div class="flex justify-center py-5">
      <p class="text-gray-500">No tags found</p>
    </div>
  {/if}
</main>

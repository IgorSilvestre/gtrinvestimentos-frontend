<script lang="ts">
  import MainButton from "$lib/modules/MainButton.svelte";

  export let formPath: string
</script>

<a href={formPath}>
  <MainButton type='button' color="primary">
    <slot />
  </MainButton>
</a>

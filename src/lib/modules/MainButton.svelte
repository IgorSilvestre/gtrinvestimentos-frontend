<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let type: "button" | "submit" | "reset" | null | undefined
  export let color: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'surface'

  const dispatch = createEventDispatcher();
  function handleClick(e: Event) {
    dispatch('click', e);
  }
</script>

<button
  on:click={handleClick}
  {type}
  class='btn variant-filled-{color}'
>
  <slot />
</button>

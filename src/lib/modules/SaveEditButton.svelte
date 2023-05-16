<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let type

  const dispatch = createEventDispatcher();
  function handleClick(e) {
    dispatch('click', e);
  }
</script>

<button
  on:click={handleClick}
  {type}
  class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
>
  <slot />
</button>

<script>
  export let name;
</script>

{#if name}
  <span
    class="px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-sm mr-2 mb-2"
    >{name}</span
  >
{/if}

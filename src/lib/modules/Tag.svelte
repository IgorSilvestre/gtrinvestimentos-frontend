<script>
  export let name;
  export let color
</script>

{#if name}
  <span class='badge variant-filled-{color}'>{name}</span>
{/if}

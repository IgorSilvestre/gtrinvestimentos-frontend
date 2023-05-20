<script lang="ts">
  export let name: string;
  export let color: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'surface'
</script>

{#if name}
  <span class='badge variant-filled-{color}'>{name}</span>
{/if}

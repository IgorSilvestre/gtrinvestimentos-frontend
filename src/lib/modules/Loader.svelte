<script lang="ts">
  export let size: string = 'w-12 h-12'; // default size
</script>

  <div class={`border-t-4 border-transparent border-solid rounded-full animate-spin ${size} bg-current`}></div>

<style>
  div {
    border-color: currentColor;
    border-top-color: #3498db; /* Default color, can be modified */
  }
</style>

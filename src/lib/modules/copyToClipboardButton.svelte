<script lang="ts">
	import { copyToClipboard } from "$lib/shared/functions/copyToClipboard"

    export let content: string;
  </script>
  
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
    on:click={() => copyToClipboard(content)}
  >
    Copiar emails
  </button>
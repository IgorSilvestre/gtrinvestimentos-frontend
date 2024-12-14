<script lang="ts">
	import { textKeys } from "$lib/shared/textKeys"
  import type { IViewType } from "$lib/interfaces-validation/IViewType"

    export let view: IViewType  = textKeys.viewTypes.sheet;

    const handleViewChange = (newView: IViewType) => {
        if (view == newView) return
        view = newView
    };
</script>

<div class="flex items-center space-x-2">
    <button
        on:click={() => handleViewChange('sheet')}
        class="flex items-center px-4 py-2 rounded-l-full border border-gray-400 focus:outline-none
            {view === 'sheet' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-300'}"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Sheet</span>
    </button>
    <button
        on:click={() => handleViewChange('cards')}
        class="flex items-center px-4 py-2 rounded-r-full border border-gray-400 focus:outline-none
            {view === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-300'}"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 16h14M5 12h14M5 20h14" />
        </svg>
        <span>Cards</span>
    </button>
</div>

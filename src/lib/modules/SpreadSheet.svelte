<script lang="ts">
    export let data: Record<string, any>[] = [
        { name: "Asset 1", price: 100, tags: ["tag1"] },
        { name: "Asset 2", description: "An asset", price: 200 },
        { name: "Asset 3" } // Missing "price" and "tags"
    ];

    // Dynamically collect all unique keys across all data objects
    let uniqueKeys: string[] = [];
    if (data.length > 0) {
        const keySet = new Set<string>();
        data.forEach(asset => {
            Object.keys(asset).forEach(key => keySet.add(key));
        });
        uniqueKeys = Array.from(keySet); // Convert Set to array
    }
</script>

<div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse border border-gray-300">
        <!-- Headers -->
        <thead>
            <tr class="bg-gray-100">
                {#each uniqueKeys as key}
                    <th class="px-4 py-2 border border-gray-300 text-left">{key}</th>
                {/each}
            </tr>
        </thead>

        <!-- Data Rows -->
        <tbody>
            {#each data as asset}
                <tr class="even:bg-gray-50 odd:bg-white">
                    {#each uniqueKeys as key}
                        <td class="px-4 py-2 border border-gray-300">
                            <!-- Render JSON for objects, or the value for primitives -->
                            {#if typeof asset[key] === 'object' && asset[key] !== null}
                                {JSON.stringify(asset[key])}
                            {:else}
                                {asset[key] || ''}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

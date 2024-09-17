<script lang="ts">
	export let data: {}
  
  console.log('JsonToTable', data)

	function renderValue(value: any) {
		if (Array.isArray(value)) {
			if (value.length === 0) {
				return '--' // Empty array
			} else {
				let html = '<ul>'
				for (const element of value) {
					html += '<li class="mt-2 border-t border-gray-300">'
					html += renderValue(element)
					html += '</li>'
				}
				html += '</ul>'
				return html
			}
		} else if (value && typeof value === 'object') {
			if (Object.keys(value).length === 0) {
				return '{}' // Empty object
			} else {
				let html = '<table>'
				for (const [key, val] of Object.entries(value)) {
					html += `
            <tr>
              <td>${key}</td>
              <td>${renderValue(val)}</td>
            </tr>`
				}
				html += '</table>'
				return html
			}
		} else {
			return value
		}
	}
</script>

<table class="w-full sm:min-w-full divide-y divide-gray-200">
	<thead>
		<tr>
			<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Field</th
			>
			<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
				>Value</th
			>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(data) as [field, value]}
			<tr>
				<td class="px-6 py-2 sm:py-4 flex mt-2 sm:mt-0 whitespace-nowrap mr-2">{field}</td>
				<td class="px-6 py-2 sm:py-4 whitespace-nowrap">
					{@html renderValue(value)}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

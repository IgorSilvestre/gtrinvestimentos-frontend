// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { regexForSearch } from './regexForSearch'

export function customSelectFilter({
	loadOptions,
	filterText,
	items,
	multiple,
	value,
	itemId,
	groupBy,
	filterSelectedItems,
	convertStringItemsToObjects,
	filterGroupedItems
}) {
	if (items && loadOptions) return items
	if (!items) return []

	if (items && items.length > 0 && typeof items[0] !== 'object') {
		items = convertStringItemsToObjects(items)
	}

	let filterResults = items.filter((item) => {
		let matchesFilter = item.label.match(regexForSearch(filterText))
		if (matchesFilter && multiple && value?.length) {
			matchesFilter = !value.some((x) => {
				return filterSelectedItems ? x[itemId] === item[itemId] : false
			})
		}

		return matchesFilter
	})

	if (groupBy) {
		filterResults = filterGroupedItems(filterResults)
	}

	return filterResults
}

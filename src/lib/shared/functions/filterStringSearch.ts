// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { regexForSearch } from './regexForSearch';

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
	// DO NOT return `items` immediately when loadOptions is present, 
	// otherwise filtering won't occur. Remove the following line:
	// if (items && loadOptions) return items;

	if (!items) return [];

	// Convert string items if necessary
	if (items.length > 0 && typeof items[0] !== 'object') {
		items = convertStringItemsToObjects(items);
	}

	// Split the filter text into words
	const words = filterText.trim().split(/\s+/).filter(Boolean);

	let filterResults = items.filter((item) => {
		// Ensure the item matches all words
		const matchesAllWords = words.every((word) => {
			// Use your regexForSearch but without global flag 'g'
			// Make sure regexForSearch does not return 'g', only 'mi'
			const reg = regexForSearch(word);
			return reg.test(item.label);
		});

		let matchesFilter = matchesAllWords;

		// If multiple selection and we want to filter out already selected items
		if (matchesFilter && multiple && value?.length && filterSelectedItems) {
			matchesFilter = !value.some((x) => x[itemId] === item[itemId]);
		}

		return matchesFilter;
	});

	if (groupBy) {
		filterResults = filterGroupedItems(filterResults);
	}

	return filterResults;
}

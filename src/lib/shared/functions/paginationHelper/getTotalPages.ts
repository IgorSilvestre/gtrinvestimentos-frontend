import { itemsPerPage } from '$lib/shared/stores'

let itemsPerPageValue: number

itemsPerPage.subscribe((value) => {
	itemsPerPageValue = value
})
// Helper function to calculate the total number of pages
export function getTotalPages(items: unknown[] | undefined): number {
	if(!items) return 0
	return Math.ceil(items.length / itemsPerPageValue)
}

import { writable } from 'svelte/store'

export const ITEMS_PER_PAGE = writable(20)

export const PAGE_COMPANY_SEARCH_RESULTS = writable()
export const PAGE_COMPANY_SEARCH_QUERY = writable('')

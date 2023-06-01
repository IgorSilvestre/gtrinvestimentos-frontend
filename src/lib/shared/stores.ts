import { createEventDispatcher } from "svelte"
import { writable } from "svelte/store"

export const Dispatch = writable(createEventDispatcher())
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { browser } from '$app/env'

type LocalStorageKey = string

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface LocalStore {
	(key: LocalStorageKey, initialValue: JsonValue): Writable<JsonValue>
}

const localStore: LocalStore = (key, initialValue) => {
	const store = writable(initialValue)

	if (browser) {
		store.set(JSON.parse(localStorage.getItem(key)) || initialValue)
		store.subscribe((value) => (localStorage[key] = JSON.stringify(value)))
	}

	return store
}

export default localStore

import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { browser } from '$app/environment'

type LocalStorageKey = string

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface LocalStore {
	(key: LocalStorageKey, initialValue: JsonValue): Writable<JsonValue>
}

const localStore: LocalStore = (key, initialValue) => {
	const store = writable(initialValue)

	if (browser) {
		const localStorageValue = JSON.parse(localStorage.getItem(key))
		console.debug('localStorageValue', localStorageValue)
		store.set(localStorageValue ?? initialValue)

		store.subscribe((value) => (localStorage[key] = value))
	}

	return store
}

export default localStore

import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export default function createLocalStore<T>(key: string, initialValue: T) {
	const store = writable(initialValue)

	if (browser) {
		const localStorageValue = JSON.parse(localStorage.getItem(key) as string)
		store.set(localStorageValue ?? initialValue)

		store.subscribe((value) => (localStorage[key] = value))
	}

	return store
}

// import { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

// type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

// export default function localStore (key: string, initialValue: JsonValue): Writable<JsonValue> {

export default function localStore (key, initialValue) {
	const store = writable(initialValue)

	store.set(JSON.parse(localStorage.getItem(key)) || initialValue)
	store.subscribe(value => (localStorage[key] = JSON.stringify(value)))

	return store
}

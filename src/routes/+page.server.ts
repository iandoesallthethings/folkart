import { getDb } from '$lib/notion'
import type { Db } from '$types'
import { notionRecordingsDb } from '$lib/secrets'

// const sorts = [{ property: 'Written', direction: 'ascending' }]
const sorts = []
const filter = { property: 'Published', checkbox: { equals: true } }

/** @type {import('./$types').PageLoad} */
export async function load() {
	const recordings: Db = (await getDb({
		database_id: notionRecordingsDb,
		sorts,
		filter,
	})) as unknown as Db

	return {
		recordings: recordings,
	} as unknown as Db
}

import { getDb } from '$lib/notion'
import { notionRecordingsDb } from '$lib/secrets'
import type { Db, Filter, Sort } from '$types'

// const sorts = [{ property: 'Written', direction: 'ascending' }]
const sorts: Sort[] = []
const filter: Filter = { property: 'Published', checkbox: { equals: true } }

/** @type {import('./$types').PageLoad} */
export async function load() {
	const recordings = await getDb<Db>({
		database_id: notionRecordingsDb,
		sorts,
		filter,
	})

	return { recordings }
}

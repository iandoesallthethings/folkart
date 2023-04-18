import type { Db, Filter, Sort } from '$types'
import { getDb } from '$lib/notion'
import { notionRecordingsDb } from '$lib/secrets'

// const sorts = [{ property: 'Written', direction: 'ascending' }]
const sorts: Sort[] = []
const filter: Filter = { property: 'Published', checkbox: { equals: true } }

export async function load() {
	const recordings = await getDb<Db>({
		database_id: notionRecordingsDb,
		sorts,
		filter,
	})

	return { recordings }
}

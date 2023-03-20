import { getDb } from '$lib/notion'
import type { Db } from '$lib/types'

const recordingsId = process.env.NOTION_RECORDINGS_DB

// const sorts = [{ property: 'Written', direction: 'ascending' }]
const sorts = []
const filter = { property: 'Published', checkbox: { equals: true } }

export async function get(): Promise<Partial<Response>> {
	const recordings = await getDb({ database_id: recordingsId, sorts, filter })

	return {
		body: {
			recordings: await Promise.all(recordings)
		} as Db
	}
}

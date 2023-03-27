import type { RequestHandler } from './$types'
import * as Notion from '$lib/notion'

export const POST: RequestHandler = async ({ request }) => {
	const { track, data } = await request.json()

	// CHARACTER LIMIT IS 2000 and file uploads aren't supported?? 😡
	// await Notion.updateWaveform(track.id, data)

	console.log(`Got new waveform data for ${track.Name}`, data)

	return new Response()
}

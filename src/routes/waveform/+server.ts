import type { RequestHandler } from './$types'
// import * as Notion from '$lib/notion'

export const POST: RequestHandler = async ({ request }) => {
	const { track, data } = await request.json()

	// await Notion.updateWaveform(track.id, data)

	console.debug(`Got new waveform data for ${track.Name}`, data)

	return new Response()
}

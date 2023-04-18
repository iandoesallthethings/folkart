import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// isr: {
			// 	expiration: 60 * 60 * 24, // Cache all responses for 12 hours
			// },
		}),
		alias: {
			$types: './src/types',
		},
	},
}

export default config

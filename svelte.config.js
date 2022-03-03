import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({ postcss: true })],

	// This is a longshot to fix the incorrect unused-selector warnings:
	// Still doesn't fix in vscode :/
	onwarn: (warning, handler) => {
		const { code, frame } = warning

		if (code === 'css-unused-selector' && frame.includes('dark')) return

		handler(warning)
	},

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$lib: path.resolve('./src/lib')
				}
			}
		}
	}
}

export default config

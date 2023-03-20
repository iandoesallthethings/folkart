/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				obi: "linear-gradient(to right, transparent 20%, white), url('/folkart1.jpg')",
				'obi-dark': "linear-gradient(to right, transparent 20%, black), url('/folkart1-dark.jpg')",
			},
		},
	},
	plugins: [],
}

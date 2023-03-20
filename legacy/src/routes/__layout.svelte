<script>
	import '../app.css'
	import 'highlight.js/styles/github.css'
	import Obi from '$lib/Obi.svelte'
	import { darkMode } from '$lib/stores'
</script>

<div class={$darkMode ? 'dark' : ''}>
	<Obi>
		<main>
			<slot />
		</main>
	</Obi>
</div>

<style>
	main {
		@apply flex flex-col max-w-prose overflow-y-auto max-h-min;
	}
</style>

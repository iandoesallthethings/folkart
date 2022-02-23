<script>
	import '../app.css'
	import 'highlight.js/styles/github.css'
	import Obi from '$lib/Obi.svelte'
</script>

<Obi>
	<main>
		<slot />
	</main>
</Obi>

<style>
	main {
		@apply flex flex-col max-w-prose;
	}
</style>

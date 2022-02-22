<script>
	import '../app.css'
	import 'highlight.js/styles/github.css'
</script>

<main>
	<slot />
</main>

<style>
	main {
		@apply p-8 flex flex-col max-w-prose;
	}
</style>

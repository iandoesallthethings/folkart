<script>
	import '../app.css'
	import 'highlight.js/styles/github.css'
	import Obi from '$lib/Obi.svelte'
</script>

<div>
	<Obi>
		<main>
			<slot />
		</main>
	</Obi>
</div>

<style lang="postcss">
	main {
		@apply flex flex-col gap-4 w-full overflow-hidden items-center h-[100dvh];
	}
</style>

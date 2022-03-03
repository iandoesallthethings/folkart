<script lang="ts">
	import StoreToggle from '$lib/StoreToggle.svelte'

	import { darkMode, showZoomView, autoplay } from '$lib/stores'
	import Hotkeys from './Hotkeys.svelte'
</script>

<section class="flex flex-col space-y-2 divide-y space-y-4">
	<div>
		<h3>Settings</h3>

		<StoreToggle store={autoplay} onIcon={'fa-solid fa-play'} offIcon={'fa-solid fa-pause'}>
			Autoplay
		</StoreToggle>

		<StoreToggle store={showZoomView} onIcon={'fa-solid fa-magnifying-glass'}>
			Show Zoom View (Requires reload or track change)
		</StoreToggle>

		<StoreToggle store={darkMode} onIcon={'fa-solid fa-moon'} offIcon={'fa-solid fa-sun'}>
			Dark Mode (WIP - looks real bad rn, lol)
		</StoreToggle>
	</div>
	<div>
		<h3>Hotkeys</h3>

		<p>These pretty closely mirror youtube hotkeys</p>

		<Hotkeys />
	</div>
	<div>
		<h3>Who made this?</h3>
		<p>
			Hi. I'm <a href="https://denkyuu-io.vercel.app" target="_blank">Ian</a>. I built this site
			using SvelteKit with Notion as a backend using a Notion API wrapper I wrote myself. There's a
			writeup of the technical side
			<a href="https://denkyuu-io.vercel.app/folk-art" target="_blank">here</a>.
		</p>

		<p>
			The music was made by me and my bandmates, all also members of
			<a href="https://partialsband.com" target="_blank">Partials</a>!
		</p>
	</div>
</section>

<style>
	p {
		@apply my-5;
	}
</style>

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
			Hi. I'm <a href="https://denkyuu-io.vercel.app" target="_blank">Ian</a>. I built this
			self-hosted SoundCloud alternative using SvelteKit with Notion as a backend using a Notion API
			wrapper I wrote myself. I did it this way because music platforms largely suck, and they're
			only getting worse. So we said fuck it: We'll do it ourselves and own our own means of
			distribution.
		</p>

		<p>
			It'll be a constant work in progress for a long time. There's a writeup of the technical side
			<a href="https://denkyuu-io.vercel.app/folk-art" target="_blank">here</a>.
		</p>

		<h3>No no, I mean the music. Who made the music? 🙄</h3>

		<p>
			The music was made by me and my bandmates, all also members of
			<a href="https://partialsband.com" target="_blank">Partials</a>! Folk Art spawned during the
			pandemic when it was hard and rare to make music in person. So we went about trying to develop
			a system of musical languages that we all could "speak" fluently, with the goal of generating
			tracks start-to-finish in a single day.
		</p>

		<p>These tracks here are the result.</p>
	</div>
</section>

<style>
	p {
		@apply my-5;
	}
</style>

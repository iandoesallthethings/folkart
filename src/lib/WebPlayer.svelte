<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { autoplay } from '$lib/stores'
	import Controls from './Controls.svelte'

	const dispatch = createEventDispatcher()

	export let track

	let player

	function next() {
		dispatch('next')
	}

	function previous() {
		dispatch('previous')
	}

	function autoNext() {
		if (!autoplay) return
		next()
	}

	function playPause() {
		player.paused ? player.play() : player.pause()
	}

	function skip(e) {
		player.currentTime += e.detail
	}
</script>

<section>
	{#key track}
		<h3>{track.Name || ' '}</h3>
		<audio on:ended={autoNext} autoplay={$autoplay} controls bind:this={player}>
			<source src={track.Latest} type="audio/mpeg" />
			Get a modern browser, jeez! Whatever, the track is
			<a href={track.Latest}>here</a>.
		</audio>
	{/key}

	<Controls
		playing={!player?.paused}
		on:playPause={playPause}
		on:next={next}
		on:previous={previous}
		on:skip={skip}
	/>
</section>

<style>
	section {
		@apply border rounded-md p-2 flex flex-col space-y-2;
	}
</style>

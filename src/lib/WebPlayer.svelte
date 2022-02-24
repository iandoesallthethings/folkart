<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { autoplay } from '$lib/stores'
	import Controls from './Controls.svelte'
	// import Peaks from 'peaks.js'
	import { onMount } from 'svelte/internal'

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

	function toggleMute() {
		player.muted = !player.muted
	}

	function volumeChange(e) {
		player.volume = e.detail
	}

	let Peaks, instance, zoomview, overview

	onMount(async () => {
		const module = await import('peaks.js')
		Peaks = module.default

		const options = {
			zoomview: {
				container: zoomview,
				waveformColor: 'rgba(125, 211, 252, 100%)'
			},
			overview: {
				container: overview,
				waveformColor: 'rgba(125, 211, 252, 100%)'
			},
			mediaElement: player,
			webAudio: { audioContext: new AudioContext() }
		}

		Peaks.init(options, (error, peaks) => {
			if (error) console.log(error)
			else instance = peaks
			// instance.on() and instance.setSource()
		})
	})
	let playing
</script>

<!-- https://github.com/bbc/peaks.js#install-with-npm -->
<!-- https://github.com/bbc/peaks.js/issues/433 -->
<section>
	{#key track}
		<h3>{track.Name || ' '}</h3>

		<div id="zoomview" bind:this={zoomview} />
		<div id="overview" bind:this={overview} />

		<audio
			on:play={() => (playing = true)}
			on:pause={() => (playing = false)}
			on:ended={autoNext}
			autoplay={$autoplay}
			bind:this={player}
		>
			<source src={track.Latest} type="audio/mpeg" />
			<h4>Get a modern browser, jeez!</h4>
			<p>Whatever. The track is <a href={track.Latest}>here</a> if you still want it.</p>
			<p>sry for being mean or whatevs. 🙄</p>
		</audio>
	{/key}

	<Controls
		{playing}
		muted={player?.muted}
		on:playPause={playPause}
		on:next={next}
		on:previous={previous}
		on:skip={skip}
		on:mute={toggleMute}
		on:volume-change={volumeChange}
	/>
</section>

<style>
	section {
		@apply border rounded-md flex flex-col space-y-2 py-1;
	}

	#zoomview,
	#overview {
		@apply w-full h-24;
	}
</style>

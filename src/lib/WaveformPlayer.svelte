<script lang="ts">
	import { onMount, createEventDispatcher, afterUpdate } from 'svelte'
	import WaveSurfer from 'wavesurfer.js'
	import { autoplay } from '$lib/stores'
	import Controls from './Controls.svelte'

	const dispatch = createEventDispatcher()

	let wavesurfer
	let waveform

	export let track
	$: if (wavesurfer && track.Latest) wavesurfer.load(track.Latest)

	onMount(() => {
		wavesurfer = WaveSurfer.create({
			container: waveform,
			normalize: true,
			responsive: true,
			hideScrollbar: true,
			pixelRatio: 1
		})

		wavesurfer.on('pause', () => (playing = false))
		wavesurfer.on('play', () => (playing = true))
		wavesurfer.on('ready', () => {
			if ($autoplay) wavesurfer.play()
		})
		wavesurfer.on('finish', () => {
			if ($autoplay) next()
		})

		wavesurfer.load(track.Latest)
	})

	let playing = false

	function next() {
		dispatch('next')
	}

	function previous() {
		dispatch('previous')
	}

	function skip(e) {
		wavesurfer.skip(e.detail)
	}

	function playPause() {
		wavesurfer.playPause()
		playing = wavesurfer.isPlaying()
	}
</script>

<section>
	<h3 class="px-2">{track.Name}</h3>
	<div id="waveform" bind:this={waveform} />

	<Controls
		{playing}
		on:skip={skip}
		on:next={next}
		on:previous={previous}
		on:playPause={playPause}
	/>
</section>

<style>
	section {
		@apply border rounded-md py-2 flex flex-col space-y-2;
	}

	#waveform {
		@apply w-full h-full;
	}
</style>

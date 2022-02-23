<script lang="ts">
	import { onMount, createEventDispatcher, afterUpdate } from 'svelte'
	import WaveSurfer from 'wavesurfer.js'
	import { autoplay } from '$lib/stores'
	import shortcut from '$lib/shortcut'

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

	function playPause() {
		wavesurfer.playPause()
		playing = wavesurfer.isPlaying()
	}

	function skip(s) {
		console.log('Seeking: ', s)
		wavesurfer.skip(s)
	}
</script>

<section>
	<h3 class="px-2">{track.Name}</h3>
	<div id="waveform" bind:this={waveform} />
	<div class="controls">
		<button on:click={previous}>
			<i class="fas fa-step-backward" />
		</button>

		{#key playing}
			<button on:click={playPause} use:shortcut={{ code: 'Space' }} use:shortcut={{ code: 'KeyK' }}>
				<i class="fas fa-{playing ? 'pause' : 'play'}" />
			</button>
		{/key}

		<button on:click={next}>
			<i class="fas fa-step-forward" />
		</button>

		<button on:click={() => skip(-5)} use:shortcut={{ code: 'KeyJ' }} class="hidden" />
		<button on:click={() => skip(5)} use:shortcut={{ code: 'KeyL' }} class="hidden" />

		<label class="cursor-pointer">
			<input type="checkbox" bind:checked={$autoplay} />
			Autoplay
		</label>
	</div>
</section>

<style>
	section {
		@apply border rounded-md py-2 flex flex-col space-y-2;
	}
	#waveform {
		@apply w-full h-full;
	}

	.controls {
		@apply flex space-x-2 items-center px-2;
	}

	.controls > button {
		@apply hover:bg-blue-300/50 px-2  rounded-md;
	}
</style>

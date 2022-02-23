<script lang="ts" context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api.json`)
		const recordings = await res.json()

		return { props: recordings }
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import WaveSurfer from 'wavesurfer.js'
	import { autoplay } from '$lib/stores'
	import shortcut from '$lib/shortcut'

	let wavesurfer
	let waveform

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

		wavesurfer.load(recordings[0].Latest)
	})

	let playing = false

	export let recordings = []

	let current = 0

	function wrap(num: number, min: number, max: number): number {
		return num >= min ? num % max : ((num % max) + max) % max
	}

	function load(index: number) {
		current = index
		wavesurfer.load(recordings[current].Latest)
	}

	function previous() {
		current = wrap(current - 1, 0, recordings.length)
		load(current)
	}

	function next() {
		current = wrap(current + 1, 0, recordings.length)
		load(current)
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

<h1>Folk Art</h1>

<section class="player">
	<h3 class="px-2">{recordings[current].Name}</h3>
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

<section class="list">
	{#each recordings as recording, i}
		<div class="list-card {current === i ? 'selected' : ''}" on:click={() => load(i)}>
			<div>{recording.Name}</div>
		</div>
	{/each}
</section>

<style>
	section {
		@apply my-5;
	}

	.player {
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

	.list {
		@apply divide-y border rounded-md overflow-hidden;
	}

	.list-card {
		@apply p-2 cursor-pointer flex justify-between hover:bg-sky-100 transition;
	}

	.list-card.selected {
		@apply bg-sky-300 hover:bg-sky-200 transition;
	}
</style>

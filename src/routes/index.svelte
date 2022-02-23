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

	let wavesurfer
	let waveform

	onMount(() => {
		setTimeout(() => {
			wavesurfer = WaveSurfer.create({
				container: waveform,
				normalize: true,
				responsive: true,
				hideScrollbar: true,
				pixelRatio: 1
			})
			wavesurfer.load(recordings[0].Latest)
		}, 500)
	})

	export let recordings = []

	let current = 0
	let autoplay = true

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

	function autoNext() {
		if (!autoplay) return
		next()
	}
	function playPause() {
		wavesurfer.playPause()
	}
</script>

<h1>Folk Art</h1>

<section>
	<h3>{recordings[current].Name}</h3>
	<div id="waveform" bind:this={waveform} />
	<div class="controls">
		<button on:click={previous}><i class="fas fa-step-backward" /></button>

		<button on:click={playPause}>
			<i class="fas fa-{wavesurfer?.isPlaying() ? 'pause' : 'play'}" />
		</button>

		<button on:click={next}><i class="fas fa-step-forward" /></button>

		<label>
			<input type="checkbox" bind:checked={autoplay} />
			auto
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
		@apply m-5;
	}
	#waveform {
		@apply w-full h-full;
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

<script lang="ts" context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api.json`)
		const recordings = await res.json()

		return { props: recordings }
	}
</script>

<script lang="ts">
	// import Player from '$lib/WaveformPlayer.svelte'
	import Player from '$lib/WebPlayer.svelte'
	import TrackList from '$lib/TrackList.svelte'

	export let recordings = []

	let current = 0

	function wrap(num: number, min: number, max: number): number {
		return num >= min ? num % max : ((num % max) + max) % max
	}

	function previous() {
		current = wrap(current - 1, 0, recordings.length)
	}

	function next() {
		current = wrap(current + 1, 0, recordings.length)
	}

	function select(e) {
		current = e.detail
	}
</script>

<div class="flex flex-col w-full space-y-4">
	<h1>Folk Art</h1>

	<Player track={recordings[current]} on:previous={previous} on:next={next} />

	<TrackList {recordings} {current} on:select={select} />
</div>

<style>
</style>

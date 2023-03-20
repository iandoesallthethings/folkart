<script lang="ts">
	import Player from '$lib/WebPlayer.svelte'
	import TrackList from '$lib/TrackList.svelte'

	/** @type {import('./$types').PageData} */
	export let data

	const recordings = data.recordings

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

	function select(event: CustomEvent) {
		current = event.detail
	}
</script>

<div class="p-4 flex flex-col gap-2 h-full">
	<h1>Folk Art</h1>

	<Player track={recordings[current]} on:previous={previous} on:next={next} />

	<TrackList {recordings} {current} on:select={select} />
</div>

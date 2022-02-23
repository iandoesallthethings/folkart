<script lang="ts" context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api.json`)
		const recordings = await res.json()

		return { props: recordings }
	}
</script>

<script lang="ts">
	import Player from '$lib/Player.svelte'

	export let recordings = []

	let current = 0

	function wrap(num: number, min: number, max: number): number {
		return num >= min ? num % max : ((num % max) + max) % max
	}

	function previous() {
		current = wrap(current - 1, 0, recordings.length)
		load()
	}

	function next() {
		current = wrap(current + 1, 0, recordings.length)
		load()
	}

	function load(index: number = current) {
		current = index
		// wavesurfer.load(track.Latest)
	}
</script>

<div class="flex flex-col w-full space-x-4">
	<h1>Folk Art</h1>

	<Player track={recordings[current]} on:previous={previous} on:next={next} />

	<section class="list">
		{#each recordings as recording, i}
			<div class="list-card {current === i ? 'selected' : ''}" on:click={() => load(i)}>
				<div>{recording.Name}</div>
			</div>
		{/each}
	</section>
</div>

<style>
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

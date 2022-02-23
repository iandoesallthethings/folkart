<script lang="ts" context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api.json`)
		const recordings = await res.json()

		return { props: recordings }
	}
</script>

<script lang="ts">
	export let recordings = []

	let current = 0
	let autoplay = true

	function wrap(num: number, min: number, max: number): number {
		return num >= min ? num % max : ((num % max) + max) % max
	}

	function load(index: number) {
		current = index
	}

	function previous() {
		current = wrap(current - 1, 0, recordings.length)
	}

	function next() {
		current = wrap(current + 1, 0, recordings.length)
	}

	function autoNext() {
		if (!autoplay) return
		next()
	}
</script>

<h1>Folk Art</h1>

<section class="player">
	{#key current}
		<div>
			<h3>{recordings[current].Name || ' '}</h3>
			<audio on:ended={autoNext} {autoplay} controls>
				<source src={recordings[current].Latest} type="audio/mpeg" />
				Get a modern browser, jeez! Whatever, the track is
				<a href={recordings[current].Latest}>here</a>.
			</audio>
		</div>
	{/key}

	<div>
		<button on:click={previous}>⏮</button>
		<button on:click={next}>⏭</button>
		<label>
			<input type="checkbox" bind:checked={autoplay} /> Auto
		</label>
	</div>
</section>

<section class="list">
	{#each recordings as recording, i}
		<div class="list-card {current === i ? 'selected' : ''}" on:click={() => load(i)}>
			<div>{recording.Name}</div>
			<!-- <div>{recordings.Written}</div> -->
		</div>
	{/each}
</section>

<style>
	section {
		@apply m-5;
	}

	.player {
		@apply border rounded-md p-2 flex items-center justify-between;
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

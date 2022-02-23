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

	function load(recordingIndex) {
		current = recordingIndex
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

<h2>Recordings</h2>

<section class="player">
	{#key current}
		<div>
			<h3>{recordings[current].Name || ' '}</h3>
			<audio controls on:ended={autoNext} {autoplay}>
				<source src={recordings[current].Latest} type="audio/mpeg" />
			</audio>
		</div>
	{/key}

	<div>
		<button on:click={previous}>⏮</button>
		<button on:click={next}>⏭</button>
		<label>
			<input type="checkbox" bind:checked={autoplay} />
			Autoplay
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
		@apply divide-y border rounded-md;
	}

	.list-card {
		@apply p-2 cursor-pointer transition flex justify-between;
	}

	.list-card.selected {
		@apply bg-sky-200;
	}
</style>

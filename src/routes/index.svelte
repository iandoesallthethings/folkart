<script lang="ts" context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api.json`)
		const recordings = await res.json()

		return { props: recordings }
	}
</script>

<script lang="ts">
	export let recordings = []

	let currentRecording

	function load(recording) {
		currentRecording = recording
	}
</script>

<h1>Folk Art</h1>

<h2>Recordings</h2>

<section class="player">
	{#key currentRecording}
		<h3>{currentRecording?.Name || ' '}</h3>
		<audio controls>
			<source src={currentRecording?.Latest} type="audio/mpeg" />
		</audio>
	{/key}
</section>

<section class="list">
	{#each recordings as recording}
		<div
			class="list-card {currentRecording?.id === recording?.id ? 'selected' : ''}"
			on:click={() => load(recording)}
		>
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
		@apply border rounded-md p-2;
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

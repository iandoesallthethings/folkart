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

{#key currentRecording}
	<h3>{currentRecording?.Name || ' '}</h3>
	<audio controls>
		<source src={currentRecording?.Latest} type="audio/mpeg" />
	</audio>
{/key}

<div id="waveform" />

{#each recordings as recording}
	<p on:click={() => load(recording)}>{recording.Name}</p>
	<!-- {JSON.stringify(recording)} -->
{/each}

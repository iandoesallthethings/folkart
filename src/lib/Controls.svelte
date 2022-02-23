<script lang="ts">
	import { onMount, createEventDispatcher, afterUpdate } from 'svelte'
	import { autoplay } from '$lib/stores'
	import shortcut from '$lib/shortcut'
	const dispatch = createEventDispatcher()

	export let playing = false

	const skipSeconds = 5

	function next() {
		dispatch('next')
	}
</script>

<div class="controls">
	<button on:click={() => dispatch('previous')}>
		<i class="fas fa-step-backward" />
	</button>

	{#key playing}
		<button
			on:click={() => dispatch('playPause')}
			use:shortcut={{ code: 'Space' }}
			use:shortcut={{ code: 'KeyK' }}
		>
			<i class="fas fa-{playing ? 'pause' : 'play'}" />
		</button>
	{/key}

	<button on:click={() => dispatch('next')}>
		<i class="fas fa-step-forward" />
	</button>

	<button
		on:click={() => dispatch('skip', -skipSeconds)}
		use:shortcut={{ code: 'KeyJ' }}
		class="hidden"
	/>
	<button
		on:click={() => dispatch('skip', skipSeconds)}
		use:shortcut={{ code: 'KeyL' }}
		class="hidden"
	/>

	<label class="cursor-pointer">
		<input type="checkbox" bind:checked={$autoplay} />
		Autoplay
	</label>
</div>

<style>
	.controls {
		@apply flex space-x-2 items-center;
	}

	.controls > button {
		@apply hover:bg-blue-300/50 px-2  rounded-md;
	}
</style>

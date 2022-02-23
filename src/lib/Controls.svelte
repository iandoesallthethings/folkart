<script lang="ts">
	import { onMount, createEventDispatcher, afterUpdate } from 'svelte'
	import { autoplay } from '$lib/stores'
	import shortcut from '$lib/shortcut'
	import ToolTip from './ToolTip.svelte'
	const dispatch = createEventDispatcher()

	export let playing = false
	export let muted = false
	const skipSeconds = 5
</script>

<div class="flex flex-row justify-between whitespace-nowrap mt-2">
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

		{#key muted}
			<button on:click={() => dispatch('mute')} use:shortcut={{ code: 'KeyM' }}>
				<i class="fas fa-volume{muted ? '-mute' : '-up'}" />
			</button>
		{/key}

		<label class="cursor-pointer">
			<input type="checkbox" bind:checked={$autoplay} />
			Autoplay
		</label>
	</div>
	<div>
		<ToolTip>
			<i slot="trigger" class="fas fa-question-circle text-gray-400" />

			<div slot="content" class="flex flex-col space-y-2">
				<p><span class="badge">K</span> Play/pause</p>
				<p><span class="badge">J/L</span> Scrub backwards/forwards</p>
				<p><span class="badge">M</span> Mute/unmute</p>
			</div>
		</ToolTip>
	</div>
</div>

<style>
	.controls {
		@apply flex space-x-2 items-center;
	}

	.controls > button {
		@apply hover:bg-blue-300/50 px-2 rounded-md;
	}

	.badge {
		@apply bg-sky-200 rounded-md text-xs p-1;
	}
</style>

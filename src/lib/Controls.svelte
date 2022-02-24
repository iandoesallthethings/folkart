<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { autoplay } from '$lib/stores'
	import shortcut from '$lib/shortcut'
	import ToolTip from './ToolTip.svelte'
	import StoreToggle from './StoreToggle.svelte'
	const dispatch = createEventDispatcher()

	export let playing = false
	export let muted = false

	let volume = 1.0
	function volumeChange() {
		dispatch('volume-change', volume)
	}

	const skipSeconds = 5
</script>

<div class="flex flex-row justify-between mt-2">
	<div id="controls">
		<button on:click={() => dispatch('previous')}>
			<i class="fa-solid fa-step-backward" />
		</button>

		<button
			on:click={() => dispatch('playPause')}
			use:shortcut={{ code: 'Space' }}
			use:shortcut={{ code: 'KeyK' }}
		>
			<i class="fa-solid fa-{playing ? 'pause' : 'play'}" />
		</button>

		<button on:click={() => dispatch('next')}>
			<i class="fa-solid fa-step-forward" />
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

		<div class="relative flex group">
			<button on:click={() => dispatch('mute')} use:shortcut={{ code: 'KeyM' }}>
				<i class="fa-solid fa-volume{muted ? '-mute' : '-up'}" />
			</button>
			<div
				class="absolute -rotate-90 -left-6 bottom-10 hidden group-hover:block transition bg-white border p-1 rounded-md flex align-center justify-center transition"
			>
				{volume}
				<input
					on:input={volumeChange}
					bind:value={volume}
					min="0.0"
					max="1.0"
					step="0.01"
					type="range"
					class="w-20"
				/>
			</div>
		</div>

		<ToolTip>
			<StoreToggle
				store={autoplay}
				onIcon={'fa-solid fa-play'}
				offIcon={'fa-solid fa-pause'}
				shortcutKeyCode={'KeyA'}
				slot="trigger"
			/>
			<div slot="content">Autoplay</div>
		</ToolTip>
	</div>

	<div id="help">
		<ToolTip>
			<i slot="trigger" class="fa-solid fa-question-circle text-gray-400 mx-2" />

			<div slot="content" class="flex flex-col space-y-2">
				<p><span class="badge">K</span> Play/pause</p>
				<p><span class="badge">J/L</span> Scrub backwards/forwards</p>
				<p><span class="badge">M</span> Mute/unmute</p>
				<p><span class="badge">A</span> Toggle Autoplay</p>
			</div>
		</ToolTip>
	</div>
</div>

<style>
	#controls {
		@apply flex space-x-2 items-center;
	}

	#controls button {
		@apply hover:bg-blue-300/50 px-2 rounded-md;
	}

	#help {
		@apply flex items-center;
	}

	.badge {
		@apply bg-sky-200 rounded-md text-xs p-1;
	}
</style>

<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { autoplay, darkMode, showZoomView } from '$lib/stores'
	import shortcut from '$lib/shortcut'
	import ToolTip from '$lib/ToolTip.svelte'
	import Modal from '$lib/Modal.svelte'
	import StoreToggle from './StoreToggle.svelte'
	const dispatch = createEventDispatcher()

	export let playing = false
	export let muted = false

	let volume = 1.0

	function volumeChange() {
		dispatch('volume-change', volume)
	}

	function toggleMute() {
		dispatch('mute')
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
			<button on:click={toggleMute} use:shortcut={{ code: 'KeyM' }}>
				<i class="fa-solid fa-volume{muted ? '-mute' : '-up'}" />
			</button>
			<div id="volume">
				<input
					on:change={volumeChange}
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

	<div class="flex items-center space-x-2 text-gray-300 mx-2">
		<Modal>
			<ToolTip slot="trigger">
				<i class="fa-solid fa-gear" slot="trigger" />

				<span slot="content">Settings</span>
			</ToolTip>

			<div slot="content">
				<h3>Settings</h3>

				<StoreToggle store={darkMode} onIcon={'fa-solid fa-moon'} offIcon={'fa-solid fa-sun'}>
					Dark Mode (not implemented yet lol)
				</StoreToggle>

				<StoreToggle store={showZoomView} onIcon={'fa-solid fa-magnifying-glass'}>
					Show Zoom View (Requires reload or track change)
				</StoreToggle>

				<StoreToggle store={autoplay} onIcon={'fa-solid fa-play'} offIcon={'fa-solid fa-pause'}>
					Autoplay
				</StoreToggle>
			</div>
		</Modal>

		<ToolTip>
			<i slot="trigger" class="fa-solid fa-question-circle" />

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

	#volume {
		@apply absolute -rotate-90 -left-6 bottom-10 hidden group-hover:block transition bg-white border p-1 rounded-md flex justify-center transition;
	}

	.badge {
		@apply bg-sky-200 rounded-md text-xs p-1;
	}
</style>

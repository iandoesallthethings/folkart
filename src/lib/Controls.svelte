<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { autoplay } from '$lib/stores'
	import shortcut from '$lib/shortcut'

	import ToolTip from '$lib/ToolTip.svelte'
	import Modal from '$lib/Modal.svelte'
	import StoreToggle from '$lib/StoreToggle.svelte'
	import Settings from '$lib/Settings.svelte'

	const dispatch = createEventDispatcher()

	export let playing = false
	export let muted = false
	export let castAvailable = false

	let volume = 1.0

	function volumeChange() {
		dispatch('volume-change', volume)
	}

	function toggleMute() {
		dispatch('mute')
	}

	function cast() {
		dispatch('cast')
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

		{#if castAvailable}
			<button on:click={cast}>
				<i class="fa-brands fa-chromecast {castAvailable ? 'text-sky-400' : 'text-gray-300'} " />
			</button>
		{/if}
	</div>

	<div class="flex items-center space-x-2 text-gray-300 mx-2">
		<Modal>
			<ToolTip slot="trigger">
				<i class="fa-solid fa-gear" slot="trigger" />

				<span slot="content">Settings</span>
			</ToolTip>

			<Settings slot="content" />
		</Modal>
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
</style>

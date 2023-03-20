<script lang="ts">
	import shortcut from '$lib/shortcut'
	export let store

	export let onIcon = ''
	export let offIcon = ''
	export let shortcutKeyCode = ''

	function toggle() {
		$store = !$store
	}
</script>

<div on:click={toggle} use:shortcut={{ code: shortcutKeyCode }} class="wrapper">
	<button class="{$store ? 'bg-sky-300' : 'bg-gray-200'} track">
		<span class="{$store ? 'translate-x-5 text-sky-400' : 'translate-x-0 text-gray-200'} slide">
			<i class={$store ? onIcon : offIcon} />
		</span>
	</button>

	<div>
		<slot />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply inline-block w-full flex items-center justify-start space-x-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/20 rounded-md hover:text-gray-900 cursor-pointer;
	}

	.track {
		@apply relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none;
	}

	.slide {
		@apply pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200 text-xs flex items-center justify-center;
	}
</style>

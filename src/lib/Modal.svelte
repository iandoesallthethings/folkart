<script lang="ts">
	import clickOutside from '$lib/clickOutside'

	let isOpen = false

	function open() {
		isOpen = true
	}

	function close() {
		if (isOpen) isOpen = false
	}
</script>

<div class="cursor-pointer" on:click={open}>
	<slot name="trigger" />
</div>

<div id="wrapper" class={isOpen ? 'flex' : 'hidden'}>
	<section use:clickOutside on:outclick={close}>
		<div class="relative flex justify-center">
			<i class="fa-solid fa-times close-button" on:click={close} />
		</div>

		<slot name="content" {open} {close} {isOpen} />
	</section>
</div>

<style>
	#wrapper {
		@apply absolute top-0 left-0 w-full h-full items-center justify-center bg-gray-500/20 z-50;
	}

	section {
		@apply max-w-prose bg-white shadow-md text-gray-800 rounded-md p-5;
	}

	.close-button {
		@apply cursor-pointer absolute top-1 right-1 px-2 py-1 rounded-full hover:bg-gray-200/50;
	}
</style>

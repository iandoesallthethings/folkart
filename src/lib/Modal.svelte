<script>
	import clickOutside from '$lib/clickOutside'

	let isOpen = false

	function open() {
		isOpen = true
	}

	function close() {
		console.log('close clicked')
		if (isOpen) isOpen = false
	}
</script>

<div class="cursor-pointer" on:click={open}>
	<slot name="trigger" />
</div>

{#if isOpen}
	<div id="wrapper">
		<section use:clickOutside on:outclick={close}>
			<slot name="content" />
		</section>
	</div>
{/if}

<style>
	#wrapper {
		@apply absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500/20 z-50;
	}

	section {
		@apply max-w-prose bg-white shadow-md text-gray-800 rounded-md p-5;
	}
</style>

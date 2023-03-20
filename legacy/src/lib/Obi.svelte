<script lang="ts">
	import { darkMode } from './stores'

	let video
	let paused
	let imagePath = '/folkart1.jpg'
	let videoPath = ''

	function toggleVideo() {
		// video.paused ? video.play() : video.pause()
		// paused = video.paused
	}
</script>

<div class="frame flex flex-row w-full dark:bg-black text-gray-700 dark:text-gray-300">
	<aside style="--gradient-end: {$darkMode ? 'black' : 'white'}" on:click={toggleVideo}>
		<!-- <video src={videoPath} poster={videoPath} preload={videoPath} class:paused playsInline muted loop autoplay bind:this={video} /> -->
	</aside>

	<div class="content">
		<slot />
	</div>
</div>

<style>
	.frame {
		@apply w-screen h-screen overflow-hidden;
	}

	aside {
		background: linear-gradient(to right, transparent 20%, var(--gradient-end)),
			url('/folkart1.jpg');
		@apply z-50 relative bg-cover bg-center w-32 md:w-52 h-screen flex justify-center items-center overflow-hidden transition;
	}

	/* .backgroundVideo {
		@apply absolute h-full cursor-pointer;
	} */

	/* .paused {
		@apply hidden;
	} */

	.content {
		@apply w-full mx-8 mt-4;
	}
</style>

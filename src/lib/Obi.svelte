<script lang="ts">
	// let video
	// let paused
	// let imagePath = '/folkart1.jpg'
	// let videoPath = ''

	// function toggleVideo() {
	// 	// video.paused ? video.play() : video.pause()
	// 	// paused = video.paused
	// }
</script>

<div class="frame ">
	<!-- 
		<aside on:click={toggleVideo}>
			<video src={videoPath} poster={videoPath} preload={videoPath} class:paused playsInline muted loop autoplay bind:this={video} />
		</aside> 
	-->
	<aside />

	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.frame {
		@apply flex flex-row w-full;
		@apply dark:bg-black text-gray-700 dark:text-gray-300;
	}

	aside {
		@apply bg-obi dark:bg-obi-dark bg-cover bg-center transition;
		@apply z-50 relative w-32 md:w-52;
		@apply flex justify-center items-center overflow-hidden;
	}

	.content {
		@apply w-full h-full;
	}

	/* .backgroundVideo {
		@apply absolute h-full cursor-pointer;
	} */

	/* .paused {
		@apply hidden;
	} */
</style>

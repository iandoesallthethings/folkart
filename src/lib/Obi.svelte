<script lang="ts">
	let video
	let paused
	let imagePath = '/folkart1.jpeg'
	let videoPath = ''

	function toggleVideo() {
		video.paused ? video.play() : video.pause()
		paused = video.paused
	}
</script>

<div class="frame flex flex-row w-full">
	<aside on:click={toggleVideo} style="background-image: url({imagePath});">
		<video
			src={videoPath}
			poster="images/saxloop-frame2.png"
			preload="images/saxloop-frame2.png"
			class:paused
			playsInline
			muted
			loop
			autoplay
			bind:this={video}
		/>
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
		@apply z-50 relative bg-cover bg-center w-32 md:w-52 h-screen flex justify-center items-center overflow-hidden;
	}

	/* .backgroundVideo {
		@apply absolute h-full cursor-pointer;
	} */

	.paused {
		@apply hidden;
	}

	.content {
		@apply w-full m-8;
	}
</style>

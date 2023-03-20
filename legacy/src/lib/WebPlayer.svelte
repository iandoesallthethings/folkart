<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { onMount } from 'svelte/internal'
	// import Peaks from 'peaks.js'

	import { autoplay, showZoomView } from '$lib/stores'
	import Controls from '$lib/Controls.svelte'
	import Loading from '$lib/Loading.svelte'

	const dispatch = createEventDispatcher()

	export let track

	let player
	let playing

	function next() {
		dispatch('next')
	}

	function previous() {
		dispatch('previous')
	}

	function autoNext() {
		if (!autoplay) return
		next()
	}

	function playPause() {
		player.paused ? player.play() : player.pause()
	}

	function skip(e) {
		player.currentTime += e.detail
	}

	function toggleMute() {
		player.muted = !player.muted
	}

	function volumeChange(e) {
		player.volume = e.detail

		if (player.volume == 0.0) player.muted = true
		else player.muted = false
	}

	let Peaks, instance, audioContext, overview, zoomview

	onMount(async () => {
		const module = await import('peaks.js')
		Peaks = module.default
		audioContext = new AudioContext()
		player.remote.watchAvailability(availabilityCallback).catch(() => {
			console.log('derp')
		})
	})

	async function initPeaks() {
		const options = {
			mediaElement: player,
			webAudio: { audioContext },
			overview: {
				container: overview,
				waveformColor: 'black',
				playedWaveformColor: 'rgba(125, 211, 252, 100%)'
			},
			zoomview: $showZoomView
				? {
						container: zoomview,
						waveformColor: 'black',
						playedWaveformColor: 'rgba(125, 211, 252, 100%)'
				  }
				: undefined
		}

		Peaks.init(options, (error, peaks) => {
			if (error) console.log(error)
			else instance = peaks
		})
	}

	// There's probably a more efficient way to do this than calling init every time :/
	// But I can't get setSource to work nicely without it double-playing.
	function load() {
		if (Peaks) initPeaks()
		// else {
		// const options = { mediaUrl: track.Latest, webAudio: { audioContext } }
		// instance.setSource(options, (e) => console.log(e))
		// }
	}

	let castAvailable

	function availabilityCallback(available) {
		castAvailable = available
	}
	async function cast() {
		await player.remote.prompt()
	}

	let castButton
</script>

<section>
	{#key track}
		<h3>{track.Name || ' '}</h3>

		<div bind:this={zoomview} class:hidden={!$showZoomView} id="zoomview" class="flex waveformview">
			<Loading />
		</div>

		<div bind:this={overview} id="overview" class="flex waveformview">
			<Loading />
		</div>

		<audio
			on:durationchange={load}
			on:play={() => (playing = true)}
			on:pause={() => (playing = false)}
			on:ended={autoNext}
			autoplay={$autoplay}
			preload="auto"
			remote="true"
			bind:this={player}
		>
			<source src={track.Latest} type="audio/mpeg" />
			<h4>Get a modern browser, jeez!</h4>
			<p>Whatever. The track is <a href={track.Latest}>here</a> if you still want it.</p>
			<p>sry for being mean or whatevs. 🙄</p>
		</audio>
	{/key}

	<Controls
		{playing}
		muted={player?.muted}
		{castAvailable}
		on:playPause={playPause}
		on:next={next}
		on:previous={previous}
		on:skip={skip}
		on:mute={toggleMute}
		on:volume-change={volumeChange}
		on:cast={cast}
	/>
</section>

<style>
	section {
		@apply border rounded-md flex flex-col space-y-2 py-1;
	}

	#zoomview,
	#overview {
		@apply w-full h-24;
		/* background-image: url('notes.svg'); */
	}

	.waveformview {
		@apply flex-col justify-center;
	}
</style>

<script lang="ts">
	import type * as P from 'peaks.js'
	import type { Track } from '$types'
	import { createEventDispatcher } from 'svelte'
	import { onMount } from 'svelte/internal'
	import { autoplay, showZoomView } from '$lib/stores'
	import Controls from '$lib/Controls.svelte'
	import Loading from '$lib/Loading.svelte'

	const dispatch = createEventDispatcher()

	export let track: Track

	let player: HTMLAudioElement
	let playing: boolean

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

	function skip(event: CustomEvent) {
		player.currentTime += event.detail
	}

	function toggleMute() {
		player.muted = !player.muted
	}

	function volumeChange(event: CustomEvent) {
		player.volume = event.detail

		if (player.volume == 0.0) player.muted = true
		else player.muted = false
	}

	let Peaks: P.default
	let instance: P.PeaksInstance
	let audioContext: AudioContext
	let overviewContainer: HTMLDivElement
	let zoomviewContainer: HTMLDivElement

	let castAvailable = false

	onMount(async () => {
		const module = await import('peaks.js')
		Peaks = module.default
		audioContext = new AudioContext()

		// YO Y THIS SHIT NO WORKIN'???
		player.remote.watchAvailability(availabilityCallback)
	})

	function availabilityCallback(available: boolean) {
		castAvailable = available
	}

	async function cast() {
		await player.remote.prompt()
	}

	async function initPeaks() {
		const waveformColor = 'lightgray'
		const playedWaveformColor = 'rgba(125, 211, 252, 100%)'

		const zoomview: P.ZoomViewOptions = {
			container: zoomviewContainer,
			waveformColor,
			playedWaveformColor,
		}

		const overview: P.OverviewOptions = {
			container: overviewContainer,
			waveformColor,
			playedWaveformColor,
		}

		const dataUri = track['Waveform Data'] ? { json: track['Waveform Data'] } : undefined

		const options: P.PeaksOptions = {
			mediaElement: player,
			dataUri,
			webAudio: dataUri ? undefined : { audioContext },
			overview,
			zoomview: $showZoomView ? zoomview : undefined,
		}

		Peaks.init(options, (error, peaks) => {
			if (error) return console.error(error)

			instance = peaks!
			if (!dataUri) {
				// updateWaveform()
				// downloadObjectAsJsonFile(instance.getWaveformData(), track.Name)
			}
		})
	}

	async function updateWaveform() {
		console.warn(`Updating waveform for ${track.Name}`)
		const data = instance.getWaveformData()
		fetch('/waveform', {
			method: 'POST',
			body: JSON.stringify({ track, data }),
		})
	}

	async function downloadObjectAsJsonFile(exportObj: any, exportName: string) {
		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
		const downloadAnchorNode = document.createElement('a')
		downloadAnchorNode.setAttribute('href', dataStr)
		downloadAnchorNode.setAttribute('download', exportName + '.json')
		document.body.appendChild(downloadAnchorNode) // required for firefox
		downloadAnchorNode.click()
		downloadAnchorNode.remove()
	}

	function load() {
		if (Peaks) initPeaks()
	}
</script>

<section>
	{#key track}
		<h3>{track.Name || ' '}</h3>

		<div
			bind:this={zoomviewContainer}
			class:hidden={!$showZoomView}
			id="zoomview"
			class="flex waveformview"
		>
			<Loading />
		</div>

		<div bind:this={overviewContainer} id="overview" class="flex waveformview">
			<Loading />
		</div>

		<audio
			id="player"
			on:durationchange={load}
			on:play={() => (playing = true)}
			on:pause={() => (playing = false)}
			on:ended={autoNext}
			autoplay={$autoplay}
			preload="auto"
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
		{castAvailable}
		muted={player?.muted}
		on:playPause={playPause}
		on:next={next}
		on:previous={previous}
		on:skip={skip}
		on:mute={toggleMute}
		on:volume-change={volumeChange}
		on:cast={cast}
	/>
</section>

<style lang="postcss">
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

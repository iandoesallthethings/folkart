<div class="table">
	<div class="badge">K/Space</div>
	<div class="label">Play/pause</div>

	<div class="badge">J/L</div>
	<div class="label">Scrub backwards/forwards</div>

	<div class="badge">M</div>
	<div class="label">Mute/unmute</div>

	<div class="badge">A</div>
	<div class="label">Toggle autoplay</div>
</div>

<style lang="postcss">
	.table {
		@apply grid grid-cols-10 gap-2 max-w-max;
	}

	.badge {
		@apply text-xs bg-sky-200 rounded-md p-1 w-min col-span-1 justify-self-end;
	}

	.label {
		@apply col-span-9;
	}
</style>

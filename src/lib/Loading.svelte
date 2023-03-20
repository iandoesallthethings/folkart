<div class="spinner" />

<style lang="postcss">
	.spinner {
		width: 100%;
		overflow-x: hidden;
		position: relative;
		height: 2px;
		/* background: #e5e7eb; */
		background: rgba(125, 211, 252, 100%);
	}
	.spinner::before {
		content: '';
		position: absolute;
		left: -130%;
		width: 100%;
		height: 100%;
		/* background: rgba(125, 211, 252, 100%); */
		background: black;
		animation: progress 3s ease-in infinite;
	}

	@keyframes progress {
		0% {
			left: -130%;
			background: rgba(black, 0.5);
		}
		50% {
			left: 130%;
			background: rgba(black, 0.5);
		}
		51% {
			background: rgba(white, 0.5);
		}
		100% {
			background: rgba(white, 0.5);
		}
	}
</style>

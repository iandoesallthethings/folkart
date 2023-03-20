<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let recordings
	export let current

	function select(index) {
		dispatch('select', index)
	}
</script>

<section class="list">
	{#each recordings as recording, i}
		<div class="list-card {current === i ? 'selected' : ''}" on:click={() => select(i)}>
			<div>{recording.Name}</div>
		</div>
	{/each}
</section>

<style lang="postcss">
	.list {
		@apply divide-y border rounded-md overflow-y-scroll h-40 grow;
	}

	.list-card {
		@apply p-2 cursor-pointer flex justify-between hover:bg-sky-100 transition;
	}

	.list-card.selected {
		@apply bg-sky-300 hover:bg-sky-200 dark:text-gray-800 transition;
	}
</style>

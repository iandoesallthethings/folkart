<div class="group relative">
	<div class="cursor-pointer">
		<slot name="trigger" class="cursor-pointer">Trigger</slot>
	</div>

	<div class="tooltip-content">
		<slot name="content" />
	</div>
</div>

<style>
	.tooltip-content {
		@apply absolute top-8 right-0 object-contain text-xs m-1 p-3 z-10 w-max rounded-md bg-gray-500/30 dark:bg-gray-900/80 invisible group-hover:visible text-gray-600;
	}
</style>

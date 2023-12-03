<script>
	export let data;
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';
</script>

{#if data?.count && data?.pages && data?.currentPage}
	<div class="my-4 flex items-center gap-x-6 gap-y-2">
		<div>
			Articles {data.currentPage * 10 - 9} to {data.currentPage * 10} of {data.count}
		</div>
		<div class="flex">
			{#if data.currentPage > 1}
				<a
					type="button"
					class="flex rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-accent"
					href={`?p=${data.currentPage - 1}${data.query ? '&q=' + data.query : ''}`}
				>
					<ChevronLeft />
					<span class="sr-only">Previous</span>
					<span class="hidden lg:inline-block">Previous</span>
				</a>
			{/if}
			{#if data.currentPage < data.pages}
				<a
					type="button"
					class="flex rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-accent"
					href={`?p=${data.currentPage + 1}${data.query ? '&q=' + data.query : ''}`}
				>
					<span class="sr-only">Next</span>
					<span class="hidden lg:inline-block">Next</span>
					<ChevronRight />
				</a>
			{/if}
		</div>
	</div>
{/if}

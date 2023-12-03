<script>
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';
	export let data;
</script>

{#if data.meta?.count && data.meta?.pages && data.meta?.currentPage}
	<div class="my-4 flex items-center gap-x-6 gap-y-2">
		<div>
			Articles {data.meta.currentPage * 10 - 9} to {data.meta.currentPage * 10} of {data.meta.count}
		</div>
		<div class="flex">
			{#if data.meta.currentPage > 1}
				<a
					type="button"
					class="flex rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-accent"
					href={`?p=${data.meta.currentPage - 1}${data.meta?.params?.query ? '&q=' + data.meta.params.query : ''}`}
				>
					<ChevronLeft />
					<span class="sr-only">Previous</span>
					<span class="hidden lg:inline-block">Previous</span>
				</a>
			{/if}
			{#if data.meta.currentPage < data.meta.pages}
				<a
					type="button"
					class="flex rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-accent"
					href={`?p=${data.meta.currentPage + 1}${data.meta?.params?.query ? '&q=' + data.meta.params.query : ''}`}
				>
					<span class="sr-only">Next</span>
					<span class="hidden lg:inline-block">Next</span>
					<ChevronRight />
				</a>
			{/if}
		</div>
	</div>
{/if}

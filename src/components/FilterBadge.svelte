<script>
	import { X } from 'lucide-svelte';
	export let data;
</script>

{#if data?.value && data?.url}
	<a href={data.url}>
		<span
			class="bg-muted-background inline-flex items-center gap-x-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground ring-1 ring-inset ring-foreground/50"
		>
			{data.value}
			<button type="button" class="group relative -mr-1 h-3.5 w-3.5 rounded-md hover:bg-accent">
				<span class="sr-only">Remove Filter</span>
				<X class="h-3.5 w-3.5" />
				<span class="absolute -inset-1"></span>
			</button>
		</span>
	</a>
{/if}

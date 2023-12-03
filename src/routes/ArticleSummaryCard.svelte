<script>
	export let data;
</script>

<div class="w-full rounded-md border border-accent p-6">
	{#if data.subject}
		<p class="mb-2 text-sm font-semibold text-muted-foreground">
			<a href={`?subject=${data.subject}`}>{data.subject}</a>
		</p>
	{/if}

	<a href={`/article/${data.slug}`} class="my-2">
		<h2 class="text-lg font-semibold leading-6">{data.title}</h2>
	</a>
	<p class="my-2 text-base font-normal text-foreground">{data.creator}</p>
	<p class="mt-2 text-sm italic text-muted-foreground">{data.dateAgo}</p>
</div>

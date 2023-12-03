<script>
	export let article;
</script>

<div class="w-full rounded-md border border-accent p-6">
	{#if article.subject}
		<p class="mb-2 text-sm font-semibold text-muted-foreground">
			<a href={`?subject=${article.subject}`}>{article.subject}</a>
		</p>
	{/if}

	<a href={`/article/${article.slug}`} class="my-2">
		<h2 class="text-lg font-semibold leading-6">{article.title}</h2>
	</a>
	<p class="my-2 text-base font-normal text-foreground">{article.creator}</p>
	<p class="mt-2 text-sm italic text-muted-foreground">{article.dateAgo}</p>
</div>

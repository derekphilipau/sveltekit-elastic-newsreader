<script>
	export let article;
</script>

<div class="w-full p-6 border border-accent rounded-md">
	{#if article.subject}
		<p class="mb-2 text-sm font-semibold text-muted-foreground">
			<a href={`?subject=${article.subject}`}>{article.subject}</a>
		</p>
	{/if}

	<a href={`/article/${article.slug}`} class="my-2">
		<h2 class="text-lg font-semibold leading-6">{article.title}</h2>
	</a>
	<p class="text-base font-normal text-foreground my-2">{article.creator}</p>
	<p class="text-sm text-muted-foreground italic mt-2">{article.dateAgo}</p>
</div>


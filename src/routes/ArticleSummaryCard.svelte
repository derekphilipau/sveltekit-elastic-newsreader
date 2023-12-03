<script>
	export let article;
</script>

<div class="w-full p-6">
	{#if article.subject}
		<p class="mt-1 text-sm font-semibold text-gray-600">
			<a href={`?subject=${article.subject}`}>{article.subject}</a>
		</p>
	{/if}

	<a href={`/article/${article.slug}`}>
		<h2 class="text-lg font-bold leading-6 text-gray-900">{article.title}</h2>
	</a>
	<p class="mt-1 text-sm text-gray-500">{article.creator}</p>
	<p class="mt-1 text-sm text-gray-500">{article.dateAgo}</p>
</div>


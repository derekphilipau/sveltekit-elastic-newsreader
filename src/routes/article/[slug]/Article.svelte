<script>
	export let data;
</script>

<article class="prose lg:prose-xl dark:prose-invert">
	{#if data.subject}
		<h3 class="article-subject">
			<a href={`/?subject=${data.subject}`}>{data.subject}</a>
		</h3>
	{/if}

	<h1>{data.title}</h1>

	<div>
		<a href={data.link}>View original</a>
	</div>

	{@html data.description}
</article>

<style>
</style>

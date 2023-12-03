<svelte:head>
	<title>SvelteKit RSS Reader</title>
	<meta name="description" content="Article" />
</svelte:head>

<script>
	/** @type {import('./$types').PageData} */
	import ArticleCard from './Article.svelte';
	export let data;
</script>

<div>
	{#if data?.title}
		<ArticleCard {data} />
	{:else}
		<p>Article not found.</p>
	{/if}
</div>

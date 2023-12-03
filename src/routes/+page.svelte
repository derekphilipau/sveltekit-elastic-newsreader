<script>
	/** @type {import('./$types').PageData} */
	import ArticleSummaryCard from './ArticleSummaryCard.svelte';
	import Pagination from './Pagination.svelte';
	import SearchFilters from './SearchFilters.svelte';
	export let data;
</script>

<svelte:head>
	<title>SvelteKit RSS Reader</title>
	<meta name="description" content="About this app" />
</svelte:head>

<SearchFilters {data} />

<Pagination {data} />

<div>
	{#if data?.documents?.length > 0}
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.documents as article}
				<li class="col-span-1 divide-y divide-neutral-200 rounded-lg shadow">
					<ArticleSummaryCard data={article} />
				</li>
			{/each}
		</ul>
	{:else}
		<p>No articles found.</p>
	{/if}
</div>

<Pagination {data} />

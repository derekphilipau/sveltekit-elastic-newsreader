<script>
	export let data;
</script>

{#if data?.count && data?.pages && data?.currentPage}
	<div class="pagination-links">
		Articles {data.currentPage * 10 - 9} to {data.currentPage * 10} of {data.count}
		{#if data.currentPage > 1}
			<a href={`?p=${data.currentPage - 1}${data.query ? '&q=' + data.query : ''}`}>Previous</a>
		{/if}
		{#if data.currentPage < data.pages}
			<a href={`?p=${data.currentPage + 1}${data.query ? '&q=' + data.query : ''}`}>Next</a>
		{/if}
	</div>
{/if}

<style>
	.pagination-links a {
		margin-left: 1rem;
	}

	.pagination-links a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.pagination-links {
			margin-top: 1rem;
		}
	}
</style>

<script>
	import FilterBadge from '$components/FilterBadge.svelte';
	export let data;
</script>

{#if data}
	<div class="flex flex-wrap justify-between gap-x-6 gap-y-2 pt-4">
		<div class="relative flex flex-grow items-stretch">
			<form action="/" method="GET" class="m-0 w-full p-0">
				<input
					class="w-full rounded-md border-0 bg-background px-2 py-2 text-foreground shadow-sm ring-1 ring-inset ring-accent placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
					type="search"
					name="q"
					placeholder="Search articles..."
					value={data?.query || ''}
				/>
			</form>
		</div>
		{#if !data.meta.params?.subject && data.aggregations?.subjects?.length > 0}
			<div class="relative flex flex-grow items-stretch">
				<form action="/" method="GET">
					<div class="flex rounded-md shadow-sm">
						<div class="relative flex flex-grow items-stretch focus-within:z-10">
							<select
								name="subject"
								class="block w-full rounded-l-md border-0 bg-background px-2 py-2 text-foreground shadow-sm ring-1 ring-inset ring-accent focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-base sm:leading-6"
							>
								<option value="">Select a subject</option>
								{#each data.aggregations.subjects as subject}
									<option value={subject.key}>{subject.key} ({subject.doc_count})</option>
								{/each}
							</select>
						</div>
						<button
							type="submit"
							class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-base font-semibold ring-1 ring-inset ring-accent"
							>Go</button
						>
					</div>
				</form>
			</div>
		{/if}
		<div class="inline-flex gap-x-2 items-stretch">
			Order by:
			{#if data.meta?.params?.order !== 'subject'}
				<span class="text-muted-foreground">Date</span> |
				<a href="/?order=subject" class="">Subject</a>
			{:else}
				<a href="/?order=date" class="">Date</a> |
				<span class="text-muted-foreground">Subject</span>
			{/if}
		</div>
	</div>
	{#if data.meta.params?.subject || data.meta.params?.query}
		<div class="flex items-center py-4">
			<FilterBadge data={{ value: data.meta.params?.subject, url: '/' }} />
			<FilterBadge data={{ value: data.meta.params?.query, url: '/' }} />
		</div>
	{/if}
{/if}

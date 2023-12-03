<script>
	import FilterBadge from '../components/FilterBadge.svelte';
	export let data;
</script>

{#if data}
	<div class="flex flex-wrap justify-between gap-x-6 gap-y-2">
		<div class="relative flex flex-grow items-stretch mb-0">
			<form action="/" method="GET" class="w-full m-0 p-0">
				<input
					class="w-full rounded-md border-0 py-2 px-2 shadow-sm ring-1 ring-inset ring-accent placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6 text-foreground bg-background"
					type="search"
					name="q"
					placeholder="Search articles..."
					value={data?.query || ''}
				/>
			</form>
		</div>
		{#if !data.subject && data.subjects?.length > 0}
			<div class="relative flex flex-grow items-stretch mb-0">
				<form action="/" method="GET">
					<div class="flex rounded-md shadow-sm">
						<div class="relative flex flex-grow items-stretch focus-within:z-10">
							<select
								name="subject"
								class="block w-full rounded-l-md border-0 py-2 px-2 shadow-sm ring-1 ring-inset ring-accent focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-base sm:leading-6 text-foreground bg-background"
							>
								<option value="">Select a subject</option>
								{#each data.subjects as subject}
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
		<div class="">
			<form action="/" method="GET">
				<div class="flex rounded-md shadow-sm">
					<div class="relative flex flex-grow items-stretch focus-within:z-10">
						<select
							name="order"
							class="block w-full rounded-l-md border-0 py-2 px-2 shadow-sm ring-1 ring-inset ring-accent focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-base sm:leading-6 text-foreground bg-background"
						>
							{#if data?.order !== 'subject'}
								<option value="date" selected>Order by date</option>
								<option value="subject">Order by subject</option>
							{:else}
								<option value="subject" selected>Order by subject</option>
								<option value="date">Order by date</option>
							{/if}
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
	</div>
{/if}
{#if data.subject || data.query}
	<div class="flex items-center py-4">
		<FilterBadge data={{ value: data?.subject, url: '/' }} />
		<FilterBadge data={{ value: data?.query, url: '/' }} />
	</div>
{/if}

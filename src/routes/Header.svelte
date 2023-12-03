<script>
	export let data;
</script>

<header>
	<nav class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="inline-flex items-center">
					<a href="/" class="text-lg font-extrabold"> RSS Reader </a>
				</div>
				<div class="inline-flex items-center">
					<ul class="flex gap-x-6">
						<li aria-current={data?.pathname === '/' ? 'page' : undefined}>
							<a href="/">Home</a>
						</li>
						<li aria-current={data?.pathname === '/about' ? 'page' : undefined}>
							<a href="/about">About</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</header>

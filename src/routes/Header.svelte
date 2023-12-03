<script>
	import { Github } from 'lucide-svelte';
	export let data;
</script>
  
<header>
	<nav class="border-b border-accent">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="inline-flex items-center">
					<a href="/" class="text-lg font-extrabold"> RSS Reader </a>
				</div>
				<div class="inline-flex items-center">
					<ul class="flex gap-x-6">
						<li aria-current={data?.pathname === '/about' ? 'page' : undefined}>
							<a href="/about">About</a>
						</li>
						<li>
							<a href="https://github.com/derekphilipau/sveltekit-elastic-newsreader" target="_blank" rel="noopener noreferrer">
								<span class="sr-only">GitHub</span>
								<Github />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</header>

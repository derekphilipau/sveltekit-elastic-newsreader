<script>
	import { Github } from 'lucide-svelte';
	import DarkModeToggle from '$components/DarkModeToggle.svelte';
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
					<ul class="flex items-center gap-x-6">
						<li aria-current={data?.pathname === '/about' ? 'page' : undefined}>
							<a href="/about">About</a>
						</li>
						<li>
							<a
								href="https://github.com/derekphilipau/sveltekit-elastic-newsreader"
								target="_blank"
								rel="noopener noreferrer"
							>
								<span class="sr-only">GitHub</span>
								<Github class="h-5 w-5" />
							</a>
						</li>
						<li>
							<DarkModeToggle />
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</header>

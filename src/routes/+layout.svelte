<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
	export let data;
</script>

<div class="app">
	<Header {data} />

	<main class="container mx-auto min-h-screen px-4">
		<slot />
	</main>

	<Footer />
</div>

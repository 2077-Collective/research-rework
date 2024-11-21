<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/ui/Nav.svelte';
	import NewsletterBanner from '$lib/components/ui/NewsletterBanner.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics();

	const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg" href="/favicon.svg" />
</svelte:head>

<div>
	<Nav />
	<div class="transition-colors duration-300 max-w-screen-2xl mx-auto">
		{@render children()}
	</div>
	<div
		class="flex flex-col grow items-center px-3 md:px-12 py-4 md:py-6 mt-8 max-w-screen-2xl mx-auto"
	>
		<NewsletterBanner />
		<Footer />
	</div>
</div>

<style>
	:global(html) {
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}
</style>

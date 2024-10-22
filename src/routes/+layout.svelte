<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/ui/Nav.svelte';

	const { children } = $props();
</script>

<div>
	<Nav />
	<div class="transition-colors duration-300 max-w-screen-2xl mx-auto">
		{@render children()}
	</div>
</div>

<style>
	:global(html) {
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}
</style>

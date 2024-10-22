<script lang="ts">
	import { onMount } from 'svelte';
	import { Moon, Sun } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	let darkMode = false;

	onMount(() => {
		darkMode = document.documentElement.classList.contains('dark');
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		document.documentElement.classList.toggle('dark');
		localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
		// Dynamically swap Prism themes
		const linkTheme = document.querySelector('link[href*="prism-one-"]') as HTMLLinkElement;
		if (linkTheme) {
			linkTheme.href = darkMode ? '/themes/prism-one-dark.css' : '/themes/prism-one-light.css';
		}
	}
</script>

<Button
	variant="ghost"
	size="icon"
	on:click={toggleDarkMode}
	class="rounded-full"
	aria-label="Toggle dark mode"
>
	{#if darkMode}
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
	{:else}
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>

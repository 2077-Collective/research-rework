<script>
	import { ArrowUpRight } from 'lucide-svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
</script>

<div
	class="sticky top-0 z-50 flex justify-between items-center px-3 md:px-12 py-4 md:py-6 max-w-screen-2xl mx-auto bg-background"
>
	<a href="/">2077 Research</a>
	<div class="flex items-center gap-4">
		<DarkModeToggle />
		<a href="https://2077.xyz" target="_blank" class="flex items-center gap-1 hover:underline">
			2077.xyz
			<ArrowUpRight class="w-5 h-5" />
		</a>
	</div>
</div>

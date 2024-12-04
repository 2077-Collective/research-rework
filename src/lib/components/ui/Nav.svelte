<script>
	import { ArrowUpRight, Menu, Mail, X } from 'lucide-svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import Button from './button/button.svelte';
	import { fade } from 'svelte/transition';

	let mobileMenuOpen = $state(true);
</script>

<div
	class="sticky top-0 z-50 flex justify-between items-center px-3 md:px-12 py-4 md:py-6 max-w-screen-2xl mx-auto bg-background"
>
	<a href="/">2077 Research</a>

	<div class="items-center gap-4 hidden md:flex">
		<Button
			class="flex items-center gap-1 justify-center w-fit px-8 bg-[#07BEBF]"
			onclick={() => {
				document.querySelector('#subscribe')?.scrollIntoView({ behavior: 'smooth' });
			}}
		>
			Subscribe
			<Mail class="w-4 h-4 ml-1" />
		</Button>
		<DarkModeToggle />
		<a href="https://2077.xyz" target="_blank" class="flex items-center gap-1 hover:underline">
			2077.xyz
			<ArrowUpRight class="w-5 h-5" />
		</a>
	</div>

	<div class="md:hidden">
		{@render mobileMenu()}
	</div>
</div>

{#snippet mobileMenu()}
	<div class="md:hidden">
		<DarkModeToggle />
		<Button variant="ghost" class="w-fit p-1" onclick={() => (mobileMenuOpen = true)}>
			<Menu class="w-5 h-5" />
		</Button>
	</div>

	{#if mobileMenuOpen}
		<div
			class="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
		>
			<div class="flex flex-col gap-4 p-4">
				<div class="flex justify-between items-center">
					<a href="/">2077 Research</a>
					<Button variant="ghost" class="w-fit p-1" onclick={() => (mobileMenuOpen = false)}>
						<X class="w-5 h-5" />
					</Button>
				</div>

				<div class="flex gap-2 items-center">
					<DarkModeToggle class="p-1 w-fit" label="Toggle dark mode" />
				</div>

				<a href="https://2077.xyz" target="_blank" class="flex items-center gap-1 hover:underline">
					2077.xyz
					<ArrowUpRight class="w-5 h-5" />
				</a>

				<Button
					href="#subscribe"
					class="mt-4 flex items-center gap-1 justify-center  px-8 bg-[#07BEBF]"
					onclick={() => {
						mobileMenuOpen = false;
						document.querySelector('#subscribe')?.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					Subscribe to our newsletter
					<Mail class="w-4 h-4 ml-1" />
				</Button>
			</div>
		</div>
	{/if}
{/snippet}

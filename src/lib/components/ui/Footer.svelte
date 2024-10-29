<script lang="ts">
	import { ArrowUpRightIcon } from 'lucide-svelte';

	type Link = { href: string; text: string; isExternal: boolean };
	const links: Link[] = [
		{ href: '/privacy-notice', text: 'Privacy notice', isExternal: false },
		{ href: 'mailto:community@2077.xyz', text: 'Contact us', isExternal: false },
		{ href: 'https://2077.xyz', text: '2077.xyz', isExternal: true },
		{ href: 'https://x.com/2077research', text: 'X (Twitter)', isExternal: true },
		{ href: 'https://discord.gg/2077collective', text: 'Discord', isExternal: true }
	];
</script>

<footer class="border-t py-6 flex flex-col md:flex-row gap-6 w-full">
	<p class="self-stretch my-auto md:hidden text-center">©2077 Research</p>
	<div
		class="flex flex-wrap gap-6 justify-center md:justify-between items-center text-base tracking-tight w-full"
	>
		<p class="self-stretch my-auto hidden md:block">©2077 Research</p>
		{#each links as link}
			{@render linkComp(link)}
		{/each}
	</div>
</footer>

{#snippet linkComp(link: Link)}
	<a
		href={link.href}
		class="flex gap-1 items-center self-stretch my-auto whitespace-nowrap hover:underline hover:underline-offset-4 focus:underline focus:underline-offset-4 focus:outline-none focus:ring-2 focus:ring-offset-2"
		target={link.isExternal ? '_blank' : '_self'}
		rel="noopener noreferrer"
	>
		<span class="self-stretch my-auto">{link.text}</span>
		{#if link.isExternal}
			<ArrowUpRightIcon class="w-4 h-4" />
		{/if}
	</a>
{/snippet}

<script lang="ts">
	import type { TableOfContents, TableOfContentsItem } from '$lib/types/article';
	import { ChevronDown } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const { tableOfContents }: { tableOfContents: TableOfContents } = $props();
	let currentHash = $state('');
	let selectedItemIndex = $state(0);
	let isOpen = $state(false);
	let showMobileTOC = $state(false);

	onMount(() => {
		currentHash = window.location.hash.slice(1);
		window.addEventListener('hashchange', () => {
			currentHash = window.location.hash.slice(1);
		});

		// Headings observer
		const headingObserver = getHeadingObserver();
		document.querySelectorAll('h1, h2').forEach((heading) => {
			if (heading.id) {
				headingObserver.observe(heading);
			}
		});

		// Table of contents observer
		const tocElement = document.getElementById('toc');
		if (tocElement) {
			getTocObserver().observe(tocElement);
		}

		return () => {
			headingObserver.disconnect();
			getTocObserver().disconnect();
		};
	});

	function getTocObserver() {
		const observer = new IntersectionObserver(
			([entry]) => {
				showMobileTOC = !entry.isIntersecting;
			},
			{ threshold: 0 }
		);
		return observer;
	}

	function getHeadingObserver() {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const id = entry.target.id;
						if (id && id !== currentHash) {
							currentHash = id;
							history.replaceState(null, '', `#${id}`);
							updateSelectedIndex(id);
						}
					}
				});
			},
			{ threshold: 1 }
		);

		return observer;
	}

	function updateSelectedIndex(id: string) {
		const index = tableOfContents.findIndex((item) => item.id === id);

		if (index === -1) {
			const parentIndex = tableOfContents.findIndex((item) =>
				item.children.some((child) => child.id === id)
			);
			if (parentIndex !== -1) {
				selectedItemIndex = parentIndex;
			}
		} else {
			selectedItemIndex = index;
		}
	}
</script>

<ul
	class="hidden lg:block pl-12 w-1/5 sticky top-24 space-y-4 text-sm max-h-[calc(100vh-6rem)] overflow-y-auto"
>
	{#each tableOfContents as item, index}
		<li>
			<a
				href={`#${item.id}`}
				class={`block transition-colors duration-200 ${selectedItemIndex === index ? 'font-medium' : 'font-normal'}`}
				style="opacity: {1 - Math.abs(selectedItemIndex - index) / tableOfContents.length}"
			>
				{item.title}
			</a>
			{@render subItem(item)}
		</li>
	{/each}
</ul>

<!-- This prevent the TOC to be visible before the user scroll past the first heading element-->
{#if showMobileTOC}
	<button
		class="sticky top-[72px] p-0 lg:hidden text-left w-full bg-black bg-opacity-40 flex items-start text-sm"
		class:h-screen={isOpen}
		onclick={() => (isOpen = !isOpen)}
	>
		<ChevronDown
			class="absolute right-3 top-3 w-5 h-5 transition-transform duration-200"
			style="transform: rotate({isOpen ? '180deg' : '0deg'})"
		/>
		{#if !isOpen}
			<div class="p-3 bg-secondary w-full">
				<div class="w-11/12 overflow-hidden whitespace-nowrap text-ellipsis">
					{tableOfContents.find((item) => item.id === currentHash)?.title ||
						tableOfContents[selectedItemIndex].children.find((child) => child.id === currentHash)
							?.title}
				</div>
			</div>
		{/if}
		{#if isOpen}
			<ul class="flex flex-col gap-3 bg-secondary p-3 grow">
				{#each tableOfContents as item, index}
					<li>
						<a
							href={`#${item.id}`}
							class={`text-sm block w-full transition-colors duration-200 ${selectedItemIndex === index ? 'font-medium' : 'font-normal'}`}
						>
							{item.title}
						</a>
						{@render subItem(item)}
					</li>
				{/each}
			</ul>
		{/if}
	</button>
{/if}

{#snippet subItem(item: TableOfContentsItem)}
	{#if item.children.length > 0 && (currentHash === item.id || item.children.some((child) => child.id === currentHash))}
		<ul class="mt-2 space-y-2">
			{#each item.children as subItem}
				<li class={`border-l-2 pl-3  ${currentHash === subItem.id ? '' : 'border-subtle'}`}>
					<a
						href={`#${subItem.id}`}
						class={`text-sm ${currentHash === subItem.id ? 'font-medium' : 'font-normal'}`}
					>
						{subItem.title}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
{/snippet}

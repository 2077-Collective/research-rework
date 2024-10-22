<script lang="ts">
	import type { ArticleMetadata } from '$lib/types/article';
	import { Search, ArrowDown } from 'lucide-svelte';
	import Badge from './badge/badge.svelte';
	import Input from './input/input.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	const ARTICLES_PER_PAGE = 9;

	const {
		articles,
		articleCategories
	}: {
		articles: ArticleMetadata[];
		articleCategories: string[];
	} = $props();
	let search = $state('');
	let selectedCategory = $state('');
	let visibleArticles = $state(ARTICLES_PER_PAGE);
	let previousVisibleCount = $state(ARTICLES_PER_PAGE);
	let newArticleRef: HTMLElement | null = $state(null);

	const filteredArticles = $derived(
		articles
			.filter((article) => {
				const categoryMatch = selectedCategory
					? article.categories.some((category) => category.name === selectedCategory)
					: true;
				return categoryMatch;
			})
			.filter((article) => {
				const titleMatch = article.title.toLowerCase().includes(search.toLowerCase());
				const summaryMatch = article.summary.toLowerCase().includes(search.toLowerCase());
				return titleMatch || summaryMatch;
			})
	);

	function loadMore() {
		previousVisibleCount = visibleArticles;
		visibleArticles += ARTICLES_PER_PAGE;

		// Wait for the DOM to update
		setTimeout(() => {
			if (newArticleRef) {
				newArticleRef.scrollIntoView({ behavior: 'smooth' });
			}
		}, 0);
	}

	onMount(() => {
		// This ensures the ref is updated when articles are filtered
		$effect(() => {
			if (filteredArticles.length > previousVisibleCount) {
				newArticleRef = document.getElementById(`article-${previousVisibleCount}`);
			}
		});
	});
</script>

<div>
	<h2 class="text-3xl md:text-5xl font-medium leading-9 mb-4 md:mb-8 font-soehne">
		Latest Research
	</h2>

	<div class="flex flex-col md:flex-row gap-2 border-y py-4 md:py-6 mb-4 md:mb-12">
		<Input class="grow-0" type="text" placeholder="Search" bind:value={search} variant="small">
			{#snippet icon()}
				<Search class="w-4 h-4" />
			{/snippet}
		</Input>
		<div class="flex flex-wrap gap-2">
			<Badge
				onclick={() => (selectedCategory = '')}
				class="cursor-pointer h-10"
				variant={selectedCategory === '' ? 'default' : 'outline'}>All</Badge
			>
			{#each articleCategories as category}
				<Badge
					onclick={() => (selectedCategory = category)}
					class="cursor-pointer h-10"
					variant={selectedCategory === category ? 'default' : 'outline'}>{category}</Badge
				>
			{/each}
		</div>
	</div>

	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-y-10 gap-x-6 justify-center"
	>
		{#each filteredArticles.slice(0, visibleArticles) as article, index}
			{#if index === visibleArticles - ARTICLES_PER_PAGE}
				<div id={`article-${index}`} bind:this={newArticleRef}>
					{@render articleCard(article)}
				</div>
			{:else}
				<div id={`article-${index}`}>
					{@render articleCard(article)}
				</div>
			{/if}
		{/each}
	</div>

	{#if visibleArticles < filteredArticles.length}
		<div class="flex justify-center mt-2">
			<button
				onclick={loadMore}
				class="flex items-center gap-3 px-4 py-2 text-2xl transition-colors duration-300 group"
			>
				Load more
				<div
					class="border rounded-full p-2 h-10 w-10 flex items-center justify-center group-hover:bg-primary group-hover:text-accent group-hover:translate-y-1 transition-transform duration-300"
				>
					<ArrowDown class="h-10 w-10 rounded-full" style="stroke-width: 1.4" />
				</div>
			</button>
		</div>
	{/if}
</div>

{#snippet articleCard(article: ArticleMetadata)}
	<div transition:slide={{ duration: 300 }} class="flex flex-col justify-center h-fit">
		<div class="flex flex-col w-full">
			<a href={`/article/${article.slug}`} class="block">
				<img src={article.thumb} alt={article.title} class="aspect-square w-full object-cover" />
			</a>
		</div>

		<div class="flex flex-col py-6 w-full">
			<div class="flex gap-1 items-start w-full text-sm">
				{#each article.categories as category}
					<Badge variant="outline">{category.name}</Badge>
				{/each}
			</div>
			<h1 class="font-soehne mt-4 text-2xl md:text-3xl font-medium leading-9">
				<a href={`/article/${article.slug}`}>{article.title}</a>
			</h1>
			<p class="mt-4 leading-6">{article.summary}</p>
			<p class="mt-4 font-medium">
				By {article.authors?.map((author) => author.full_name || author.username).join(', ')}
			</p>
		</div>
	</div>
{/snippet}

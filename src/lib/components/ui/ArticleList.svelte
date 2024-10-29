<script lang="ts">
	import type { ArticleMetadata } from '$lib/types/article';
	import { Search, ArrowDown } from 'lucide-svelte';
	import Badge from './badge/badge.svelte';
	import Input from './input/input.svelte';
	import ArticleCard from './ArticleCard.svelte';
	import { slide } from 'svelte/transition';
	import { tick } from 'svelte';

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
	let loading = $state(false);

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

	async function loadMore() {
		if (loading) return;
		loading = true;
		await tick();

		previousVisibleCount = visibleArticles;
		visibleArticles += ARTICLES_PER_PAGE;

		loading = false;
	}

	$effect(() => {
		visibleArticles = selectedCategory ? Number.MAX_SAFE_INTEGER : ARTICLES_PER_PAGE;
	});

	$effect(() => {
		if (filteredArticles.length > previousVisibleCount) {
			newArticleRef = document.getElementById(`article-${previousVisibleCount}`);
		}
	});
</script>

{#snippet cardSkeleton()}
	<div class="flex flex-col justify-center h-fit animate-pulse">
		<div class="flex flex-col w-full">
			<div class="aspect-square w-full bg-gray-200 rounded-md"></div>
		</div>
		<div class="flex flex-col py-6 w-full space-y-4">
			<div class="flex gap-1 items-start w-full text-sm">
				<div class="w-16 h-6 bg-gray-200 rounded-md"></div>
				<div class="w-16 h-6 bg-gray-200 rounded-md"></div>
			</div>
			<div class="h-8 bg-gray-200 w-3/4 rounded-md"></div>
			<div class="h-4 bg-gray-200 w-full rounded-md"></div>
			<div class="h-4 bg-gray-200 w-5/6 rounded-md"></div>
			<div class="h-4 bg-gray-200 w-1/2 rounded-md"></div>
		</div>
	</div>
{/snippet}

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
			<div transition:slide={{ delay: 100 * (index % ARTICLES_PER_PAGE) }}>
				<ArticleCard {article} />
			</div>
		{/each}

		{#if loading}
			{#each Array(ARTICLES_PER_PAGE) as _}
				{@render cardSkeleton()}
			{/each}
		{/if}
	</div>

	{#if visibleArticles < filteredArticles.length}
		<div class="flex justify-center py-4 md:py-10">
			<button
				onclick={loadMore}
				class="flex items-center gap-3 px-4 py-2 text-2xl transition-colors duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={loading}
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

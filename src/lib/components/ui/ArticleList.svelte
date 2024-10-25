<script lang="ts">
	import type { ArticleMetadata } from '$lib/types/article';
	import { Search, ArrowDown } from 'lucide-svelte';
	import Badge from './badge/badge.svelte';
	import Input from './input/input.svelte';
	import ArticleCard from './ArticleCard.svelte';

	const ARTICLES_PER_PAGE = 9;
	
	const styleCache = new Map();

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
	}

	function validateColor(color: string): string {
		const colorRegex =
			/^(#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})|rgb[a]?\([\d\s%,.]+\)|hsl[a]?\([\d\s%,.]+\)|var\(--[\w-]+\)|transparent|inherit|[a-z]+)$/i;
		return colorRegex.test(color) ? color : 'inherit';
	}

	function validatePadding(padding: string): string {
		const classes = padding.trim().split(/\s+/);
		const paddingRegex = /^p[txbylr]?-(?:[0-9]|1[0-9]|20)$/;
		const isValid = classes.every((cls) => paddingRegex.test(cls));
		return isValid ? classes.join(' ') : '';
	}

	let getArticleStyle = (article: ArticleMetadata) => {
		const cacheKey = `${article.is_sponsored}-${article.sponsor_color}-${article.sponsor_text_color}-${article.sponsor_padding}`;

		if (styleCache.has(cacheKey)) {
			return styleCache.get(cacheKey);
		}

		let style = '';
		if (article.is_sponsored) {
			style = [
				`background-color: ${validateColor(article.sponsor_color ?? 'transparent')}`,
				`color: ${validateColor(article.sponsor_text_color ?? 'inherit')}`
			].join('; ');
			styleCache.set(cacheKey, style);
		}

		return style;
	};

	$effect(() => {
		visibleArticles = selectedCategory ? Number.MAX_SAFE_INTEGER : ARTICLES_PER_PAGE;
	});

	$effect(() => {
		if (filteredArticles.length > previousVisibleCount) {
			newArticleRef = document.getElementById(`article-${previousVisibleCount}`);
		}
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
				<div
					id={`article-${index}`}
					bind:this={newArticleRef}
					style={getArticleStyle(article)}
					class={article.is_sponsored ? validatePadding(article.sponsor_padding ?? '') : ''}
				>
					<ArticleCard {article} />
				</div>
			{:else}
				<div id={`article-${index}`}>
					<ArticleCard {article} />
				</div>
			{/if}
		{/each}
	</div>

	{#if visibleArticles < filteredArticles.length}
		<div class="flex justify-center py-4 md:py-10">
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

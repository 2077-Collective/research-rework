<script lang="ts">
	import type { ArticleMetadata } from '$lib/types/article';
	import { getArticles, setArticles } from '$lib/stores/articles.svelte';
	import ArticleCard from './ArticleCard.svelte';
	import { onMount } from 'svelte';
	import { fetchArticles } from '$lib/services/article.service';

	const { 
		categories,
		relatedArticlesFromApi = []
	}: { 
		categories: ArticleMetadata['categories'],
		relatedArticlesFromApi?: ArticleMetadata[]
	} = $props();
	
	let relatedArticles: ArticleMetadata[] = $state([]);

	const getRelatedArticles = (articles: ArticleMetadata[]): ArticleMetadata[] => {
		// First try to get articles from the same categories
		const sameCategory = articles.filter((article) =>
			article.categories.some((category) => 
				categories.some(c => c.name === category.name)
			)
		);

		let selectedArticles: ArticleMetadata[];

		if (sameCategory.length >= 3) {
			// If we have 3 or more category matches, take first 3
			selectedArticles = sameCategory.slice(0, 3);
		} else if (sameCategory.length > 0) {
			// If we have some category matches but less than 3,
			// use them and fill the rest with random articles
			selectedArticles = [
				...sameCategory,
				...articles
					.filter(article => !sameCategory.includes(article))
					.slice(0, 3 - sameCategory.length)
			];
		} else {
			// If no category matches, take first 3 articles
			selectedArticles = articles.slice(0, 3);
		}

		// Ensure we always return exactly 3 articles
		return selectedArticles.slice(0, 3);
	};

	$effect(() => {
		if (relatedArticlesFromApi && relatedArticlesFromApi.length > 0) {
			// If we have articles from API, ensure we take exactly 3
			relatedArticles = relatedArticlesFromApi.slice(0, 3);
			return;
		}

		const articles = getArticles();
		relatedArticles = getRelatedArticles(articles);
	});

	onMount(async () => {
		if (relatedArticles.length === 0 && !relatedArticlesFromApi?.length) {
			const articles = await fetchArticles();
			setArticles(articles);
		}
	});
</script>

<div class="flex flex-col">
	<h2 class="text-3xl md:text-5xl font-medium leading-9 mb-6 md:mb-12 font-soehne">
		Related research
	</h2>
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-y-10 gap-x-6 justify-center"
	>
		{#each relatedArticles as article}
			<ArticleCard {article} />
		{/each}
	</div>
</div>
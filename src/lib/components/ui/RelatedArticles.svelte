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
		categories: ArticleMetadata['categories'];
		relatedArticlesFromApi?: ArticleMetadata[];
	} = $props();

	let relatedArticles: ArticleMetadata[] = $state([]);

	const getRelatedArticles = (articles: ArticleMetadata[]): ArticleMetadata[] => {
		const sameCategory = articles.filter((article) =>
			article.categories.some((category) =>
				categories.some((c) => c?.name && category?.name && c.name === category.name)
			)
		);

		let selectedArticles: ArticleMetadata[];

		if (sameCategory.length >= 3) {
			selectedArticles = sameCategory.slice(0, 3);
		} else if (sameCategory.length > 0) {
			const sameCategorySet = new Set(sameCategory);
			selectedArticles = [
				...sameCategory,
				...articles
					.filter((article) => !sameCategorySet.has(article))
					.slice(0, 3 - sameCategory.length)
			];
		} else {
			selectedArticles = articles.slice(0, 3);
		}
		return selectedArticles;
	};

	$effect(() => {
		relatedArticles =
			relatedArticlesFromApi.length > 0
				? relatedArticlesFromApi.slice(0, 3)
				: getRelatedArticles(getArticles());
	});

	onMount(async () => {
		if (relatedArticles.length === 0 && !relatedArticlesFromApi.length) {
			try {
				const articles = await fetchArticles();
				setArticles(articles);
			} catch (error) {
				console.error('Failed to fetch articles:', error);
			}
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

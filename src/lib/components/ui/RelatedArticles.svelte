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

	$effect(() => {
		if (relatedArticlesFromApi && relatedArticlesFromApi.length > 0) {
			relatedArticles = relatedArticlesFromApi;
			return;
		}

		const articles = getArticles();

		const sameCategory = articles.filter((article) =>
			article.categories.some((category) => 
				categories.some(c => c.name === category.name)
			)
		);

		if (sameCategory.length > 3) {
			relatedArticles = sameCategory.slice(0, 3);
		} else if (sameCategory.length === 0) {
			relatedArticles = articles.slice(0, 3);
		} else {
			relatedArticles = sameCategory;
		}
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
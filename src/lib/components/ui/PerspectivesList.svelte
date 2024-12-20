<script lang="ts">
	import type { PerspectivesArticleMetadata } from '$lib/types/perspectives';
	import SearchBar from '$lib/components/ui/SearchBar.svelte';
	import PerspectivesCard from './PerspectivesCard.svelte';

	const { articles }: { articles: PerspectivesArticleMetadata[] } = $props();
	const articleCategories = $derived([
		...new Set(articles.map((article) => article.categories).flat())
	]);
	let searchTerm = $state('');
	let selectedCategory = $state('');
	const filteredArticles = $derived(
		articles
			.filter((article) => {
				const categoryMatch = selectedCategory
					? article.categories.some((category) => category === selectedCategory)
					: true;
				return categoryMatch;
			})
			.filter((article) => {
				return (
					article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
					article.author.full_name.toLowerCase().includes(searchTerm.toLowerCase())
				);
			})
	);
</script>

<SearchBar {articleCategories} bind:searchTerm bind:selectedCategory />

<ul class="flex flex-col gap-6">
	{#each filteredArticles as article}
		<li>
			<PerspectivesCard {article} />
		</li>
	{/each}
</ul>

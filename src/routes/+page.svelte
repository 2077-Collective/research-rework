<script lang="ts">
	import ArticleSpotlight from '$lib/components/ui/ArticleSpotlight.svelte';
	import ArticleList from '$lib/components/ui/ArticleList.svelte';
	import type { PageData } from './$types';
	import { setArticles } from '$lib/stores/articles.svelte';
	import { onMount } from 'svelte';
	import Testimonials from '$lib/components/ui/Testimonials.svelte';
	import BaseHead from '$lib/components/server/BaseHead.svelte';

	const { data }: { data: PageData } = $props();
	const articles = $derived(data.articles);
	const articleCategories = $derived(data.articleCategories);

	onMount(() => {
		setArticles(data.articles);
	});
</script>

<BaseHead />

<div class="px-3 md:px-12 flex flex-col gap-10">
	<!-- These heights are arbitrary and never repeated throughout the website, that's why they're not in tailwind config -->
	<div
		class="font-soehne h-[420px] md:h-[714px] relative border-b flex flex-col justify-end bg-gradient-to-b from-gray-100 to-transparent dark:from-secondary dark:to-transparent"
	>
		<!-- leading-[69px] and max-w-[928px] are arbitrary and never repeated throughout the website, that's why it's not in tailwind config -->
		<h1
			class="font-soehne text-3xl md:leading-[69px] md:text-6xl font-medium max-w-[928px] mb-12 px-10"
		>
			State of the art research on Ethereum and the broader crypto ecosystem
		</h1>
	</div>

	<ArticleSpotlight article={articles[0]} />
	<ArticleList {articles} {articleCategories} />
	<Testimonials />
</div>

<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { page } from '$app/stores';

	const { article }: { article: Article } = $props();

	const pageUrl = $page.url.origin;
</script>

<svelte:head>
	<!-- Essential Meta Tags -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Basic Meta Tags -->
	<title>{article.title}</title>
	<meta name="title" content={article.title} />
	<meta name="description" content={article.summary} />

	<!-- Open Graph Meta Tags -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={article.title} />
	<meta property="og:description" content={article.summary} />
	<meta property="og:image" content={article.thumb} />
	<meta property="og:url" content={pageUrl} />
	{#if article.scheduledPublishTime}
		<meta property="article:published_time" content={article.scheduledPublishTime} />
	{/if}
	{#if article.authors}
		<meta
			property="article:author"
			content={article.authors.map((author) => author.fullName).join(', ')}
		/>
	{/if}

	<!-- X Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={article.title} />
	<meta name="twitter:description" content={article.summary} />
	<meta name="twitter:image" content={article.thumb} />
	<meta name="twitter:url" content={pageUrl} />
	<meta name="twitter:site" content="2077Research" />
</svelte:head>

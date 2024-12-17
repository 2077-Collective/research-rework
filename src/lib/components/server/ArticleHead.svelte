<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { page } from '$app/stores';
	import ArticleJsonLd from './ArticleJsonLd.svelte';

	const { article }: { article?: Article } = $props();

	const pageUrl = $page.url.origin;

	function sanitizeMetaContent(content: string): string {
		return content
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}
</script>

<svelte:head>
	{#if article}
		<title>{sanitizeMetaContent(article.title)}</title>
		<meta charset="utf-8" />
		<meta name="generator" content="2077 Research" />

		<meta name="title" content={sanitizeMetaContent(article.title)} />
		<meta name="description" content={sanitizeMetaContent(article.summary)} />

		<!-- OG meta tags -->
		<meta property="og:type" content="website" />
		<meta property="og:title" content={sanitizeMetaContent(article.title)} />
		<meta property="og:description" content={sanitizeMetaContent(article.summary)} />
		<meta property="og:image" content={sanitizeMetaContent(article.thumb)} />

		<!-- Twitter meta tags -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={sanitizeMetaContent(article.title)} />
		<meta name="twitter:description" content={sanitizeMetaContent(article.summary)} />
		<meta name="twitter:image" content={sanitizeMetaContent(article.thumb)} />
		<meta name="twitter:url" content={sanitizeMetaContent(`${pageUrl}/${article.slug}`)} />
		<meta name="twitter:site" content="@2077Research" />

		<!-- General meta tags -->
		<meta name="title" content={sanitizeMetaContent(article.title)} />
		<meta name="description" content={sanitizeMetaContent(article.summary)} />
		<meta
			name="author"
			content={article.authors?.map((author) => author.fullName || author.username).join(', ')}
		/>

		<ArticleJsonLd {article} />
	{/if}
</svelte:head>

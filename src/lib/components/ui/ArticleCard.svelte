<script lang="ts">
	import type { ArticleMetadata } from '$lib/types/article';
	import { slide } from 'svelte/transition';
	import Badge from './badge/badge.svelte';
	import { colorRegex, paddingRegex } from '$lib/types/article';
	import { writable } from 'svelte/store';

	const containerClasses = writable<string>('');

	const TRANSITION_DURATION = 300;
	const variantStyles = {
		default: '',
		sponsored: 'bg-primary-50 border border-primary-300'
	};

	const MAX_CACHE_SIZE = import.meta.env.VITE_ARTICLE_CACHE_SIZE ?? 100;
	const styleCache = new Map();

	type StyleVariant = 'default' | 'sponsored';

	/**
	 * @component
	 * @prop {ArticleMetadata} article - The article metadata to display
	 * @prop {StyleVariant} [variant='default'] - The display variant of the article card
	 */
	const { article }: { article: ArticleMetadata } = $props();

	const variant: StyleVariant = article.is_sponsored ? 'sponsored' : 'default';

	function limitCacheSize() {
		if (styleCache.size > MAX_CACHE_SIZE) {
			const keysToDelete = Array.from(styleCache.keys()).slice(0, styleCache.size - MAX_CACHE_SIZE);
			keysToDelete.forEach((key) => styleCache.delete(key));
		}
	}

	function validatePadding(padding: string): string {
		if (!padding) return '';
		const classes = padding.trim().split(/\s+/);
		const isValid = classes.every((cls) => paddingRegex.test(cls));
		return isValid ? classes.join(' ') : '';
	}

	let getArticleStyle = (article: ArticleMetadata) => {
		if (!article.is_sponsored) return '';

		const isValidColor = (color: string | undefined) => !color || colorRegex.test(color);

		if (!isValidColor(article.sponsor_color) || !isValidColor(article.sponsor_text_color)) {
			return '';
		}

		const cacheKey = `${article.is_sponsored}-${article.sponsor_color}-${article.sponsor_text_color}-${article.sponsor_padding}`;

		if (styleCache.has(cacheKey)) {
			return styleCache.get(cacheKey);
		}

		const style = [
			`background-color: ${article.sponsor_color ?? 'transparent'}`,
			`color: ${article.sponsor_text_color ?? 'inherit'}`
		].join('; ');

		styleCache.set(cacheKey, style);
		limitCacheSize();

		return style;
	};

	$effect(() => {
		const classes = [
			'flex flex-col justify-center h-fit',
			variantStyles[variant],
			article.is_sponsored ? validatePadding(article.sponsor_padding ?? '') : ''
		]
			.filter(Boolean)
			.join(' ');

		containerClasses.set(classes);
	});
</script>

<a href={`/${article.slug}`} class="block">
	<div
		transition:slide={{ duration: TRANSITION_DURATION }}
		class={$containerClasses}
		style={getArticleStyle(article)}
	>
		<div class="flex flex-col w-full">
			<img src={article.thumb} alt={article.title} class="aspect-square w-full object-cover" />
		</div>

		<div class="flex flex-col py-6 w-full">
			<div class="flex gap-1 items-start w-full text-sm">
				{#each article.categories as category}
					<Badge variant="outline">{category.name}</Badge>
				{/each}
			</div>
			<h1 class="font-soehne mt-4 text-2xl md:text-3xl font-medium leading-9">
				{article.title}
			</h1>
			<p class="mt-4 leading-6">{article.summary}</p>
			<p class="mt-4 font-medium">
				By {article.authors?.map((author) => author.full_name || author.username).join(', ')}
			</p>
		</div>
	</div>
</a>

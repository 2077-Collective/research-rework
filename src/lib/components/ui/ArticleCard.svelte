<script lang="ts">
	import type { ArticleMetadata } from '$lib/types/article';
	import { slide } from 'svelte/transition';
	import Badge from './badge/badge.svelte';

	const { article }: { article: ArticleMetadata } = $props();
</script>

<div transition:slide={{ duration: 300 }} class="flex flex-col justify-center h-fit">
	<div class="flex flex-col w-full">
		<a href={`/article/${article.slug}`} class="block">
			<img src={article.thumb} alt={article.title} class="aspect-square w-full object-cover" />
		</a>
	</div>

	<div class="flex flex-col py-6 w-full">
		<div class="flex gap-1 items-start w-full text-sm">
			{#each article.categories as category}
				<Badge variant="outline">{category.name}</Badge>
			{/each}
		</div>
		<h1 class="font-soehne mt-4 text-2xl md:text-3xl font-medium leading-9">
			<a href={`/article/${article.slug}`}>{article.title}</a>
		</h1>
		<p class="mt-4 leading-6">{article.summary}</p>
		<p class="mt-4 font-medium">
			By {article.authors?.map((author) => author.full_name || author.username).join(', ')}
		</p>
	</div>
</div>

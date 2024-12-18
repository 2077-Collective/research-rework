<script lang="ts">
	import type { ArticleMetadata } from '$lib/types/article';
	import Badge from './badge/badge.svelte';
	import { optimizeCloudinaryUrl } from '$lib/utils/optimise-cloudinary';

    const { article }: { article: ArticleMetadata } = $props();
</script>

<a href={`/${article.slug}`}>
	<div class="flex flex-col lg:flex-row">
		<img
		src={optimizeCloudinaryUrl(article.thumb, { type: 'spotlight' })}
			alt={article.title}
			class="w-full h-auto lg:w-4/6 object-cover"
			width="960"
			height="712"
		/>
		<div
			class="flex flex-col gap-3 md:gap-6 w-full lg:w-2/6 flex flex-col p-6 md:p-10 text-base tracking-normal bg-secondary max-md:px-5 max-md:max-w-full"
		>
			<div class="flex gap-1 items-start w-full text-sm leading-none">
				{#each article.categories as category}
					<Badge variant="outline">{category.name}</Badge>
				{/each}
			</div>
			<h1 class="font-soehne text-5xl font-medium max-md:text-3xl leading-[57px]">
				{article.title}
			</h1>
			<p class="leading-7 dark:text-white">
				{article.summary}
			</p>
			<p class="font-medium dark:text-white">
				By {article.authors?.map((author) => author.username).join(', ')}
			</p>
		</div>
	</div>
</a>

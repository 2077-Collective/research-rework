<script lang="ts">
	import type { PerspectivesArticleMetadata } from '$lib/types/perspectives';
	import { Badge } from './badge';
	const { article }: { article: PerspectivesArticleMetadata } = $props();
</script>

<a href={`/perspectives/${article.slug}`}>
	<div class="flex pb-6 border-b">
		<div class="shrink-0">
			<img
				src={article.author.avatar}
				alt={article.author.full_name}
				class="aspect-square object-cover"
			/>
		</div>
		<div class="flex flex-col gap-2 justify-between py-2 px-8">
			<div>
				{#each article.categories as category}
					<Badge variant="outline" class="mr-2 mb-4">{category}</Badge>
				{/each}
				<div class="flex flex-col gap-2 mb-6">
					<h1 class="font-soehne text-2xl md:text-4xl">{article.title}</h1>
					<div class="flex gap-2 text-gray-500">
						<time datetime={article.createdAt.toISOString()}>
							{new Date(article.createdAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</time>
						<span>—</span>
						<p class="md:text-base">{article.readTime} min read</p>
					</div>
				</div>
				<p class="text-sm md:text-base">{article.description}</p>
			</div>

			<div class="text-sm md:text-base flex gap-2 items-center">
				<p>Opinion piece by {article.author.full_name}, {article.author.role} at</p>

				{#if article.author.company?.logo}
					<img
						src={article.author.company?.logo}
						alt={article.author.company?.name}
						class="w-6 h-6"
					/>
				{/if}
				<p>{article.author.company?.name}</p>
			</div>
		</div>
	</div>
</a>

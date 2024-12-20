<script lang="ts">
	import ArticleContent from '$lib/components/ui/ArticleContent.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import type { PerspectivesArticle } from '$lib/types/perspectives';
	import { page } from '$app/stores';

	// TODO: abstract this to a function so it can be shared with the article page
	const encodedUrl = encodeURIComponent($page.url.href);
	const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodedUrl}`;
	const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
	const linkedinShareURL = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;

	const { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col px-3 md:px-12">
	{@render header(data.article)}
	{@render author(data.article)}
	<div class="w-full flex justify-center">
		<ArticleContent content={data.article.content} />
	</div>
</div>

{#snippet header(article: PerspectivesArticle)}
	<div class="">
		<header
			class="flex justify-between flex-col p-10 border-b max-md:px-5 bg-gradient-to-b from-gray-100 to-transparent dark:from-secondary dark:to-transparent"
		>
			<a
				href="/perspectives"
				aria-label="Back to Home"
				class="flex gap-2 justify-center items-center px-2 w-10 h-10 border border-solid rounded-full mb-32 md:mb-16 bg-background hover:bg-input"
			>
				<ArrowLeft class="w-6 h-6" />
			</a>
			<div class="flex flex-col max-w-full tracking-tight text-center mx-auto">
				<div class="flex flex-col pb-16 w-full max-w-4xl">
					<h1
						class="font-soehne text-6xl font-medium leading-[70px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px] break-words"
					>
						{article.title}
					</h1>
					<p class="mt-4 text-2xl leading-9 max-md:max-w-full">
						{article.description}
					</p>
				</div>
			</div>

			<div
				class="flex flex-wrap gap-1 md:gap-10 w-full justify-between items-start w-full tracking-tight max-md:max-w-full"
			>
				<time datetime={article.metadata.createdAt.toISOString()} class="text-gray-500">
					Published on {new Date(article.metadata.createdAt).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</time>
				<nav class="flex gap-1.5 items-center min-w-[240px]">
					<span class="self-stretch my-auto">Share on</span>
					<a
						href={twitterShareURL}
						target="_blank"
						rel="noopener noreferrer"
						class="gap-1 self-stretch my-auto border-b border-neutral-950"
					>
						X
					</a>
					<span class="self-stretch my-auto">,</span>
					<a
						href={facebookShareURL}
						target="_blank"
						rel="noopener noreferrer"
						class="gap-1 self-stretch my-auto border-b"
					>
						Facebook
					</a>
					<span class="self-stretch my-auto">or</span>
					<a
						href={linkedinShareURL}
						target="_blank"
						rel="noopener noreferrer"
						class="gap-1 self-stretch my-auto border-b"
					>
						Linkedin
					</a>
					<!-- <span class="self-stretch my-auto mx-2">|</span> -->
					<!-- <button
						onclick={() => downloadPDF(article)}
						class="flex items-center gap-1 hover:text-primary/50 cursor-pointer"
						aria-label="Download as PDF"
					>
						<FileDown class="w-5 h-5" />
						<span class="border-b">PDF</span>
					</button> -->
				</nav>
			</div>
		</header>
	</div>
{/snippet}

{#snippet author(article: PerspectivesArticle)}
	<div class="p-10 border-b w-full flex justify-center">
		<div class="flex gap-6">
			<div class="shrink-0">
				<img
					src={article.metadata.author.avatar}
					alt={article.metadata.author.full_name}
					class="w-36 h-36"
				/>
			</div>
			<div class="max-w-2xl">
				<div class="text-neutral-500 mb-3">This is an opinion piece by</div>
				<p class="font-medium mb-1">
					{article.metadata.author.full_name}
				</p>
				<p>{article.metadata.author.bio}</p>
			</div>
		</div>
	</div>
{/snippet}

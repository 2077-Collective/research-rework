<!-- TODO: Add links to share buttons -->
<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { onMount, tick } from 'svelte';
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';
	import Prism from 'prismjs';

	import 'prismjs/components/prism-python';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-rust';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-latex';
	import 'prismjs/components/prism-sql';
	import 'prismjs/components/prism-c';
	import 'prismjs/components/prism-markup';
	import 'prismjs/components/prism-solidity';
	import RelatedArticles from '$lib/components/ui/RelatedArticles.svelte';

	let currentURL = $state('');
	let isHighlighting = $state(false);
	let highlightError = $state<Error | null>(null);
	let contentReady = $state(false);
	let lightboxImages = $state<string[]>([]);
	let lightboxIndex = $state(0);
	let showLightbox = $state(false);

	// NEW - Initialize as state variables instead
	let twitterShareURL = $state('');
	let facebookShareURL = $state('');
	let linkedinShareURL = $state('');

	const { data }: { data: PageData } = $props();

	async function loadPrismLanguages(languages: string[]) {
		const promises = languages.map(async (lang) => {
			try {
				await import(`prismjs/components/prism-${lang}`);
			} catch (error) {
				console.warn(`Failed to load language: ${lang}`, error);
			}
		});
		await Promise.all(promises);
	}

	async function highlightCodeBlocks() {
		if (!contentReady) return;

		isHighlighting = true;
		highlightError = null;

		try {
			await tick();

			const codeElements = document.querySelectorAll('pre code');
			if (codeElements.length === 0) {
				return;
			}

			const languageMatches = Array.from(codeElements)
				.map((el) => {
					const classes = el.className.split(' ');
					return classes.find((c) => c.startsWith('language-'))?.replace('language-', '');
				})
				.filter((lang): lang is string => !!lang);

			const uniqueLanguages = [...new Set(languageMatches)];
			await loadPrismLanguages(uniqueLanguages);

			await tick();

			requestAnimationFrame(() => {
				Prism.highlightAll();
			});
		} catch (error) {
			highlightError = error instanceof Error ? error : new Error(String(error));
		} finally {
			isHighlighting = false;
		}
	}

	function extractImagesFromContent(content: string): string[] {
		if (typeof window === 'undefined') return [];

		const parser = new DOMParser();
		const doc = parser.parseFromString(content, 'text/html');
		const images = Array.from(doc.querySelectorAll('img')).map((img) => img.src);
		return images;
	}

	function updateImageEventListeners() {
		if (typeof window === 'undefined') return;

		const container = document.getElementById('content-container');
		if (container) {
			const images = container.querySelectorAll('img');
			images.forEach((img, index) => {
				img.addEventListener('click', () => {
					console.log('element clicked', img.src);
					lightboxIndex = lightboxImages.indexOf(img.src);
					showLightbox = true;
				});
			});
		}
	}

	function initializeShareURLs() {
		const url = new URL(window.location.href);
		twitterShareURL = `https://twitter.com/intent/tweet?text=${url.toString()}`;
		facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${url.toString()}`;
		linkedinShareURL = `https://www.linkedin.com/shareArticle?mini=true&url=${url.toString()}`;
	}

	onMount(() => {
		currentURL = window.location.href;
		contentReady = true;
		highlightCodeBlocks();
		initializeShareURLs();

		if (data.article.content) {
			lightboxImages = extractImagesFromContent(data.article.content);
		}

		updateImageEventListeners();

		const observer = new MutationObserver(() => {
			updateImageEventListeners();
		});

		const container = document.getElementById('content-container');
		if (container) {
			observer.observe(container, { childList: true, subtree: true });
		}

		return () => {
			observer.disconnect();
		};
	});

	$effect(() => {
		if (data.article.content && contentReady) {
			highlightCodeBlocks();
		}
	});

	$effect(() => {
		if (typeof window !== 'undefined') {
			const newURL = window.location.href;
			if (currentURL && currentURL !== newURL) {
				currentURL = newURL;
				contentReady = false;
				setTimeout(() => {
					contentReady = true;
					highlightCodeBlocks();
				}, 100);
			}
		}
	});
</script>

<div class="flex flex-col gap-y-6 md:gap-y-14">
	{@render header(data.article)}
	<div class="px-3 md:px-12">
		<img src={data.article.thumb} alt={data.article.title} class="w-full h-full object-cover" />
	</div>
	{@render body(data.article)}
	<div class="px-3 md:px-12">
		<hr class="mb-6 md:mb-12" />
		<RelatedArticles categories={data.article.categories} />
	</div>
</div>

{#snippet header(article: Article)}
	<div class="px-3 md:px-12">
		<header
			class="flex justify-between flex-col p-10 border-b max-md:px-5 bg-gradient-to-b from-gray-100 to-transparent dark:from-secondary dark:to-transparent"
		>
			<a
				href="/"
				aria-label="Back to Home"
				class="flex gap-2 justify-center items-center px-2 w-10 h-10 border border-solid rounded-full mb-32 md:mb-44"
			>
				<ArrowLeft class="w-6 h-6" />
			</a>
			<div class="flex flex-col max-w-full tracking-tight w-[888px]">
				<section class="flex flex-col pb-8 w-full">
					<h1
						class="font-soehne text-6xl font-medium leading-[70px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px] break-words"
					>
						{article.title}
					</h1>
					<p class="mt-4 text-2xl leading-9 max-md:max-w-full">
						{article.summary}
					</p>
				</section>
				<div class="flex flex-col self-start pb-6 mt-4 max-md:max-w-full">
					<div class="flex gap-1.5 items-start self-start">
						<span>By</span>
						<div class="flex items-center gap-1">
							{#each article.authors as author, index}
								<a
									href={author.twitterUsername
										? `https://twitter.com/${author.twitterUsername}`
										: null}
									target="_blank"
									rel="noopener noreferrer"
									class="gap-1 self-stretch my-auto border-b"
								>
									{author.fullName}
								</a>
								{#if index < article.authors.length - 2}
									<span class="self-stretch my-auto">,</span>
								{:else if index < article.authors.length - 1}
									<span class="self-stretch my-auto">and</span>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div
				class="flex flex-wrap gap-1 md:gap-10 w-full justify-between items-start w-full tracking-tight max-md:max-w-full"
			>
				<time datetime={article.scheduledPublishTime} class="text-gray-500">
					Published on {new Date(article.scheduledPublishTime).toLocaleDateString('en-GB', {
						year: 'numeric',
						month: 'long',
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
				</nav>
			</div>
		</header>
	</div>
{/snippet}

{#snippet body(article: Article)}
	<div class="lg:flex lg:gap-14 relative">
		<TableOfContents tableOfContents={article.tableOfContents} />
		<div id="toc" class="block lg:hidden"></div>

		<div
			id="content-container"
			class="px-3 md:px-12 lg:px-0 pb-20 text-primary w-full lg:max-w-screen-md leading-8 flex flex-col
			[&>h1]:text-5xl [&>h1]:font-medium [&>h1]:mb-6 [&>h1]:mt-16 [&_h1]:leading-58 [&_h1]:tracking-tighter
            [&>h2]:text-3xl [&>h2]:font-medium [&>h2]:mt-8 [&>h2]:mb-4 [&_h2]:leading-9 [&_h2]:tracking-tight
            [&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-4 [&_h3]:leading-7 [&_h3]:tracking-tight
            [&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-3
			[&>p]:text-base md:[&>p]:text-lg [&_p]:leading-7 [&_p]:tracking-normal [&_p]:mb-4
			[&_p:has(img)]:mt-6 [&_p:has(img)]:mb-12 [&_p:has(img)]:text-xs [&_p:has(img)]:text-gray-400 [&_p:has(img)]:text-center
			[&_a]:underline [&_a]:underline-offset-4
			[&_strong]:font-semibold [&_strong]:leading-6 [&_strong]:tracking-normal [&_strong]:text-base
			[&_table]:mb-6 md:[&_table]:mb-8 [&_table]:w-full md:[&_table]:w-2/3
			[&_em]:leading-6 [&_em]:italic
			[&_ol]:flex [&_ol]:flex-col [&_ol]:gap-y-1 [&_ol]:mb-6 [&_ol]:ml-6 [&_ol]:text-lg [&_ol]:list-decimal [&_ol]:leading-7 [&_ol]:tracking-normal
			[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-1 [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:text-lg [&_ul]:list-disc [&_ul]:leading-7 [&_ul]:tracking-normal
			[&>ul>li]:leading-8 [&>ul>li>p]:mb-0 [&>ol>li>p]:mb-0
			[&>a]:underline
			[&_img]:mx-auto [&_img]:block [&_img]:pb-2.5
			[&_blockquote]:border-l-4 [&_blockquote]:border-gray-500 [&_blockquote]:pl-4
			[&_blockquote]:mb-4 [&_blockquote]:italic
			[&_pre]:overflow-x-auto [&_code]:overflow-x-auto [&_code:not(pre_>_code)]:text-[#0312BF]
            "
		>
			{@html article.content}
		</div>
	</div>
{/snippet}

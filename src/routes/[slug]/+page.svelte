<!-- TODO: Add links to share buttons -->
<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { ArrowLeft, XIcon, ScrollText, Link2 } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { onMount, tick, hydrate } from 'svelte';
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';
	import Prism from 'prismjs';
	import RelatedArticles from '$lib/components/ui/RelatedArticles.svelte';
	import { page } from '$app/stores';
	import NewsletterBanner from '$lib/components/ui/NewsletterBanner.svelte';
	import { fly } from 'svelte/transition';

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
	import ArticleHead from '$lib/components/server/ArticleHead.svelte';

	type ContentState = 'initial' | 'updating' | 'ready' | 'error';
	let contentState: ContentState = 'initial';

	let currentURL = $state('');
	let lightboxImages = $state<string[]>([]);
	let lightboxIndex = $state(0);
	let showLightbox = $state(false);
	let summaryOpen = $state(false);
	let showFloatingButton = $state(false);
	let copySuccess = $state(false);

	const encodedUrl = encodeURIComponent($page.url.href);
	const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodedUrl}`;
	const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
	const linkedinShareURL = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;

	const { data }: { data: PageData } = $props();

	async function highlightCodeBlocks() {
		if (contentState !== 'ready') return;

		try {
			const codeElements = document.querySelectorAll('pre code');
			if (codeElements.length === 0) {
				return;
			}

			requestAnimationFrame(() => {
				Prism.highlightAll();
			});
		} catch (error) {
			contentState = 'error';
			console.error('Highlighting error:', error);
		}
	}

	async function updateContent() {
		contentState = 'updating';
		try {
			await tick();
			contentState = 'ready';
			highlightCodeBlocks();
		} catch (error) {
			console.error('Content update failed:', error);
			contentState = 'error';
		}
	}

	function extractImagesFromContent(content: string): string[] {
		if (!window) return [];

		try {
			const parser = new DOMParser();
			const doc = parser.parseFromString(content, 'text/html');
			const images = Array.from(doc.querySelectorAll('img')).map((img) => img.src);
			return images;
		} catch (error) {
			console.error('Failed to extract images:', error);
			return [];
		}
	}

	function updateImageEventListeners() {
		if (!window) return;

		const container = document.getElementById('content-container');
		if (container) {
			const images = container.querySelectorAll('img');
			images.forEach((img) => {
				img.addEventListener('click', () => {
					lightboxIndex = lightboxImages.indexOf(img.src);
					showLightbox = true;
				});
			});
		}
	}

	function addSmoothScrollingToInternalLinks() {
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();

				const targetId = anchor.getAttribute('href')?.substring(1);
				if (!targetId) return;

				const targetElement = document.getElementById(targetId);

				if (targetElement) {
					targetElement.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			});
		});
	}

	function hydrateNewsletterBanner() {
		const container = document.getElementById('newsletter-banner-container');
		if (container) {
			hydrate(NewsletterBanner, {
				target: container,
				props: { variant: 'article' }
			});
		}
	}

	function toggleSummary() {
		summaryOpen = !summaryOpen;
		updateURL();
	}

	function updateURL() {
		const url = new URL(window.location.href);
		if (summaryOpen) {
			url.searchParams.set('summary', 'true');
		} else {
			url.searchParams.delete('summary');
		}
		window.history.replaceState({}, '', url);
	}

	async function copyShareLink() {
		const url = new URL(window.location.href);
		url.searchParams.set('summary', 'true');
		await navigator.clipboard.writeText(url.toString());
		copySuccess = true;
		setTimeout(() => {
			copySuccess = false;
		}, 2000);
	}

	function handleScroll() {
		if (!window) return;
		const contentContainer = document.querySelector('#content-container');
		if (!contentContainer) return;

		const contentRect = contentContainer.getBoundingClientRect();
		showFloatingButton = contentRect.top <= window.innerHeight && contentRect.bottom >= 0;
	}

	onMount(() => {
		hydrateNewsletterBanner();

		currentURL = window.location.href;
		contentState = 'ready';

		if (data.article.content) {
			lightboxImages = extractImagesFromContent(data.article.content);
		}

		highlightCodeBlocks();
		addSmoothScrollingToInternalLinks();
		updateImageEventListeners();

		const observer = new MutationObserver(() => {
			updateImageEventListeners();
		});

		const container = document.getElementById('content-container');
		if (container) {
			observer.observe(container, { childList: true, subtree: true });
		}

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check

		const urlParams = new URLSearchParams(window.location.search);
		summaryOpen = urlParams.get('summary') === 'true';

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	});

	$effect(() => {
		if (data.article.content && contentState === 'ready') {
			highlightCodeBlocks();
		}
	});

	$effect(() => {
		if (window) {
			const newURL = window.location.href;
			if (currentURL && currentURL !== newURL) {
				currentURL = newURL;
				contentState = 'updating';
				updateContent();
			}
		}
	});
</script>

<ArticleHead article={data.article} />

<div class="flex flex-col gap-y-6 md:gap-y-14">
	{@render header(data.article)}
	<div class="px-3 md:px-12">
		<img 
			src={data.article.thumb} 
			alt={data.article.title} 
			class="w-full h-full object-cover cover-image" 
		/>
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
				class="flex gap-2 justify-center items-center px-2 w-10 h-10 border border-solid rounded-full mb-32 md:mb-44 bg-background hover:bg-input"
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
			[&>h1]:scroll-mt-32 [&>h2]:scroll-mt-32 [&>h3]:scroll-mt-32 [&>h4]:scroll-mt-32
			[&>h1]:text-5xl [&>h1]:font-medium [&>h1]:mb-6 [&>h1]:mt-16 [&_h1]:leading-58 [&_h1]:tracking-tighter
			[&>h2]:text-3xl [&>h2]:font-medium [&>h2]:mt-8 [&>h2]:mb-4 [&_h2]:leading-9 [&_h2]:tracking-tight
			[&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-4 [&_h3]:leading-7 [&_h3]:tracking-tight
			[&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-3
			[&>p]:text-base md:[&>p]:text-lg [&_p]:leading-7 [&_p]:tracking-normal [&_p]:mb-4
			[&_p:has(img)]:mt-6 [&_p:has(img)]:mb-12 [&_p:has(img)]:text-xs [&_p:has(img)]:text-gray-400 [&_p:has(img)]:text-center
			[&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary/50
			[&_strong]:font-semibold [&_strong]:leading-6 [&_strong]:tracking-normal [&_strong]:text-base
			[&_table]:mb-6 md:[&_table]:mb-8 [&_table]:w-full md:[&_table]:w-2/3
			[&_em]:leading-6 [&_em]:italic
			[&_ol]:flex [&_ol]:flex-col [&_ol]:gap-y-1 [&_ol]:mb-6 [&_ol]:ml-6 [&_ol]:text-lg [&_ol]:list-decimal [&_ol]:leading-7 [&_ol]:tracking-normal
			[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-1 [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:text-lg [&_ul]:list-disc [&_ul]:leading-7 [&_ul]:tracking-normal
			[&>ul>li]:leading-8 [&>ul>li>p]:mb-0 [&>ol>li>p]:mb-0
			[&>a]:underline
			[&_img]:mx-auto [&_img]:block [&_img]:pb-2.5
			[&>blockquote]:text-base md:[&>blockquote]:text-lg [&>blockquote]:leading-7 [&>blockquote]:tracking-normal
			[&_blockquote]:border-l-4 [&_blockquote]:border-h-auto [&_blockquote]:border-gray-300 [&_blockquote]:pl-7
			[&_blockquote]:mb-4 [&_blockquote]:italic [&_blockquote>p:last-of-type]:mb-0
			[&_pre]:overflow-x-auto [&_code]:overflow-x-auto [&_code:not(pre_>_code)]:text-[#0312BF]"
		>
			{@html article.content}
		</div>
		{@render floatingSummaryButton()}
	</div>
{/snippet}

{#snippet markdown(content: string)}
	<div class="text-primary w-full leading-8
		[&>h1]:text-5xl [&>h1]:font-medium [&>h1]:mb-6 [&>h1]:mt-16 [&_h1]:leading-58 [&_h1]:tracking-tighter
		[&>h2]:text-3xl [&>h2]:font-medium [&>h2]:mt-8 [&>h2]:mb-4 [&_h2]:leading-9 [&_h2]:tracking-tight
		[&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-4 [&_h3]:leading-7 [&_h3]:tracking-tight
		[&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-3
		[&>p]:text-base md:[&>p]:text-lg [&_p]:leading-7 [&_p]:tracking-normal [&_p]:mb-4
		[&_p:has(img)]:mt-6 [&_p:has(img)]:mb-12 [&_p:has(img)]:text-xs [&_p:has(img)]:text-gray-400 [&_p:has(img)]:text-center
		[&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary/50
		[&_strong]:font-semibold [&_strong]:leading-6 [&_strong]:tracking-normal [&_strong]:text-base
		[&_em]:leading-6 [&_em]:italic
		[&_ol]:flex [&_ol]:flex-col [&_ol]:gap-y-1 [&_ol]:mb-6 [&_ol]:ml-6 [&_ol]:text-lg [&_ol]:list-decimal [&_ol]:leading-7 [&_ol]:tracking-normal
		[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-1 [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:text-lg [&_ul]:list-disc [&_ul]:leading-7 [&_ul]:tracking-normal"
	>
		{@html content}
	</div>
{/snippet}

{#snippet floatingSummaryButton()}
	{#if data.article.gpt_summary}

	<div class="fixed inset-y-0 right-0 pointer-events-none z-50 flex items-center">
		{#if summaryOpen}
			<div 
				class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500"
				style="opacity: {summaryOpen ? '1' : '0'}"
				onclick={toggleSummary}
				role="presentation"
				aria-hidden="true"
			></div>
		{/if}
		<div
			class="w-full lg:max-w-screen-md bg-background border-l h-screen transform will-change-transform backface-visibility-hidden -webkit-backface-visibility-hidden transition-transform duration-500 ease-out pointer-events-auto flex flex-col relative z-10"
			style="transform: translateX({summaryOpen ? '0%' : '100%'})"
		>
			{#if summaryOpen}
				<div class="sticky top-0 z-10 bg-background border-b px-8 py-4 flex justify-between items-center">
					<div class="flex items-center gap-4">
						<h2 class="text-2xl font-medium">Summary</h2>
						<button
							onclick={copyShareLink}
							class="p-2 hover:bg-secondary rounded-full relative group"
							aria-label="Copy share link"
						>
							<Link2 class="w-5 h-5" />
							{#if copySuccess}
								<span class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm bg-primary text-white px-2 py-1 rounded whitespace-nowrap">
									Link copied!
								</span>
							{/if}
						</button>
					</div>
					<button
						onclick={toggleSummary}
						class="p-2 hover:bg-secondary rounded-full"
						aria-label="Close summary"
					>
						<XIcon class="w-6 h-6" />
					</button>
				</div>
				<div class="flex-1 overflow-y-auto px-12 py-6">
					{@render markdown(data.article.gpt_summary ?? '')}
				</div>
			{/if}
		</div>
	</div>

	{#if showFloatingButton}
		<div
			class="fixed bottom-10 right-10 transition-all duration-300"
			in:fly={{ y: 20, duration: 300, opacity: 0 }}
			out:fly={{ y: 20, duration: 300, opacity: 0 }}
		>
			<button
				onclick={toggleSummary}
				class="bg-primary text-white p-4 rounded-full hover:bg-primary/90 transition-colors"
				aria-label="Toggle summary"
			>
				<ScrollText class="w-6 h-6" />
			</button>
		</div>
	{/if}
{/if}
{/snippet}

<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let hasConsent = false;

	const pageUrl = $page.url.origin;
	const image = `${pageUrl}/preview-image.jpg`;
	const title = '2077 Research';
	const description = 'State of the art research on Ethereum and the broader crypto ecosystem';

	let analyticsScript = '';
	let nonce = $page.locals.nonce;

	onMount(() => {
		const dnt = browser && navigator.doNotTrack === '1';
		try {
			hasConsent = !dnt && localStorage.getItem('analytics-consent') === 'true';
		} catch (e) {
			hasConsent = false;
			console.warn('Unable to access localStorage, analytics disabled');
		}

		if (hasConsent) {
			const gaId = import.meta.env.VITE_GA_TRACKING_ID;
			const script = `
				window.dataLayer = window.dataLayer || [];
				function gtag() {
					dataLayer.push(arguments);
				}
				gtag('js', new Date());
				gtag('config', '${gaId}', {
					send_page_view: false,
					transport_type: 'beacon'
				});
			`;
			analyticsScript = script.trim();
		}
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="generator" content="2077 Research" />

	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<!-- OG meta tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter meta tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:url" content={pageUrl} />
	<meta name="twitter:site" content="@2077Research" />

	<!-- General meta tags -->
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	{#if hasConsent}
		<link rel="preconnect" href="https://www.googletagmanager.com" />
		<link rel="preconnect" href="https://www.google-analytics.com" />
		<script
			async
			src="https://www.googletagmanager.com/gtag/js?id={import.meta.env.VITE_GA_TRACKING_ID}"
		></script>
		{@html `<script nonce={nonce}>${analyticsScript}</script>`}
	{/if}
</svelte:head>

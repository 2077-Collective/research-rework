<script lang="ts">
	import { page } from '$app/stores';

	const pageUrl = $page.url.origin;
	const image = `${pageUrl}/preview-image.jpg`;
	const title = '2077 Research';
	const description = 'State of the art research on Ethereum and the broader crypto ecosystem';
</script>

<svelte:head>
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
</svelte:head>

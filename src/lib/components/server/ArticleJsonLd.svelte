<script lang="ts">
  import type { Article } from '$lib/types/article';

  const { article }: { article: Article } = $props();

  const jsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'image': article.thumb,
    'datePublished': article.scheduledPublishTime,
    'dateModified': article.updatedAt,
    'author': article.authors.map(author => ({
      '@type': 'Person',
      'name': author.fullName,
      'url': author.twitterUsername ? `https://twitter.com/${author.twitterUsername}` : undefined
    })),
    'publisher': {
      '@type': 'Organization',
      'name': '2077 Research',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://2077research.com/favicon.svg'
      }
    },
    'description': article.summary
  });
</script>

<svelte:head>
    {@html `<script type="application/ld+json">${JSON.stringify(
        jsonLd(),
    )}</script>`}
</svelte:head>

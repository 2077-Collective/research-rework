import { getArticleBySlug } from '$lib/services/article.service';
import type { PageServerLoad } from './$types';
import { render } from 'svelte/server';
import NewsletterBanner from '$lib/components/ui/NewsletterBanner.svelte';

const OPENING_H2_TAG = '<h1';
const NEWSLETTER_ID = 'newsletter-banner-container';

/// Includes the newsletter banner in the article content after the second section
export const load: PageServerLoad = async ({ params }) => {
	const article = await getArticleBySlug(params.slug);
	const positionOfFirstSection = article.content.indexOf(OPENING_H2_TAG);
	const positionOfSecondSection = article.content.indexOf(
		OPENING_H2_TAG,
		positionOfFirstSection + 1
	);

	if (positionOfSecondSection !== -1) {
		article.content =
			article.content.slice(0, positionOfSecondSection) +
			`<div id="${NEWSLETTER_ID}">` +
			render(NewsletterBanner, {
				props: { variant: 'article' }
			}).body +
			'</div>' +
			article.content.slice(positionOfSecondSection);
	}

	return { article };
};

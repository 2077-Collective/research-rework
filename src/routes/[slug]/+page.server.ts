import { getArticleBySlug } from '$lib/services/article.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return { article: await getArticleBySlug(params.slug) };
};

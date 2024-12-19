import { fetchArticles } from '$lib/services/article.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const articles = await fetchArticles();
	const articleCategories = Array.from(
		new Set(articles.flatMap((article) => article.categories.map((category) => category.name)))
	);

	return {
		articles,
		articleCategories
	};
};

import type { ArticleMetadata } from '$lib/types/article';

let articles: ArticleMetadata[] = $state([]);

export function setArticles(newArticles: ArticleMetadata[]) {
	articles = newArticles;
}

export function getArticles() {
	return articles;
}

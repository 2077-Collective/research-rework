import {
	ArticleMetadataArraySchema,
	ArticleSchema,
	type Article,
	type ArticleMetadata
} from '$lib/types/article';

export const fetchArticles = async (): Promise<ArticleMetadata[]> => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/articles`);
	const body = await res.json();
	return ArticleMetadataArraySchema.parse(body);
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/articles/${slug}`);
	const body = await res.json();
	return ArticleSchema.parse(body.data);
};

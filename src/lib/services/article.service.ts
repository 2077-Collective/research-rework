import {
	ArticleMetadataArraySchema,
	ArticleSchema,
	type Article,
	type ArticleMetadata
} from '$lib/types/article';

export const fetchArticles = async (): Promise<ArticleMetadata[]> => {
	const res = await fetch('http://localhost:8002/api/articles');
	const body = await res.json();
	return ArticleMetadataArraySchema.parse(body);
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
	const res = await fetch(`http://localhost:8002/api/articles/${slug}`);
	const body = await res.json();
	return ArticleSchema.parse(body.data);
};

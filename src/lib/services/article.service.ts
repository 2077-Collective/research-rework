import {
	ArticleMetadataArraySchema,
	ArticleSchema,
	type Article,
	type ArticleMetadata
} from '$lib/types/article';

const baseURL = 'https://cms.2077.xyz/api';

export const fetchArticles = async (): Promise<ArticleMetadata[]> => {
	const res = await fetch(`${baseURL}/articles`);
	const body = await res.json();
	return ArticleMetadataArraySchema.parse(body);
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
	const res = await fetch(`${baseURL}/articles/${slug}`);
	const body = await res.json();
	return ArticleSchema.parse(body.data);
};

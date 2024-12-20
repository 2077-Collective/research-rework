import { PUBLIC_BASE_API_URL } from '$env/static/public';
import {
	ArticleMetadataArraySchema,
	FullArticleSchema,
	type Article,
	type ArticleMetadata
} from '$lib/types/article';

export const fetchArticles = async (): Promise<ArticleMetadata[]> => {
	const res = await fetch(`${PUBLIC_BASE_API_URL}/articles`);
	const body = await res.json();
	return ArticleMetadataArraySchema.parse(body);
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
	try {
		const res = await fetch(`${PUBLIC_BASE_API_URL}/articles/${slug}`);
		const body = await res.json();
		return FullArticleSchema.parse(body.data);
	} catch (error) {
		return null;
	}
};

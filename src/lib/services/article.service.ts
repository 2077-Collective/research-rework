import {
	ArticleMetadataArraySchema,
	ArticleSchema,
	type Article,
	type ArticleMetadata
} from '$lib/types/article';


export const fetchArticles = async (): Promise<ArticleMetadata[]> => {
	if (!import.meta.env.VITE_API_BASE_URL) {
		throw new Error('API base URL is not configured');
	}
	try {
		const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles/`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const body = await res.json();
		return ArticleMetadataArraySchema.parse(body);
	} catch (error) {
		const errorMessage = `Failed to fetch articles: ${error instanceof Error ? error.message : 'Unknown error'}`;
		throw error instanceof Error ? Object.assign(error, { message: errorMessage }) : new Error(errorMessage);
	}
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
	if (!slug?.trim() || !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(slug.toLowerCase())) {
		throw new Error('Invalid article slug. Only alphanumeric characters and hyphens are allowed.');
	}
	try {
		const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles/${slug}/`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const body = await res.json();
		return ArticleSchema.parse(body.data);
	} catch (error) {
		const errorMessage = `Failed to fetch article ${slug}: ${error instanceof Error ? error.message : 'Unknown error'}`;
		throw error instanceof Error ? Object.assign(error, { message: errorMessage }) : new Error(errorMessage);
	}
};

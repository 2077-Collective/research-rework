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
		const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/articles`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const body = await res.json();
		return ArticleMetadataArraySchema.parse(body);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to fetch articles: ${error.message}`);
		}
		throw error;
	}
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
	if (!slug?.trim()) {
		throw new Error('Article slug is required');
	}

	if (!import.meta.env.VITE_API_BASE_URL) {
		throw new Error('API base URL is not configured');
	}
	try {
		const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/articles/${slug}`);
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const body = await res.json();
		return ArticleSchema.parse(body.data);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to fetch article ${slug}: ${error.message}`);
		}
		throw error;
	}
};

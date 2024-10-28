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
		const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
		if (!res.ok) {
			const errorMessage = res.status >= 500
				? 'Internal server error occurred'
				: res.status === 404
					? 'Articles not found'
					: 'Failed to fetch articles';
			console.error(`Error fetching articles: ${res.status} - ${res.statusText}`);

			throw new Error(errorMessage);
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
	if (!import.meta.env.VITE_API_BASE_URL) {
		throw new Error('API base URL is not configured');
	}
	try {
		const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles/${encodeURIComponent(slug)}`);
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

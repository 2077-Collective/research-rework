import {
    ArticleMetadataArraySchema,
    FullArticleSchema,
    type Article,
    type ArticleMetadata
} from '$lib/types/article';

export const fetchArticles = async (): Promise<ArticleMetadata[]> => {
    const res = await fetch('https://cms.2077.xyz/api/articles');
    const body = await res.json();
    return ArticleMetadataArraySchema.parse(body);
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
    const res = await fetch(`https://cms.2077.xyz/api/articles/${slug}`);
    const body = await res.json();
    return FullArticleSchema.parse(body.data);
};
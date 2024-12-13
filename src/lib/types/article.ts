import { z } from 'zod';

// Define Zod schemas
const CategorySchema = z.object({
	name: z.string()
});

const AuthorSchema = z.object({
	username: z.string(),
	id: z.string(),
	full_name: z.string(),
	twitter_username: z.string().nullable()
});

const RelatedArticleSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	authors: z.array(AuthorSchema),
	thumb: z.string(),
	categories: z.array(CategorySchema),
	summary: z.string(),
	min_read: z.number(),
	created_at: z.string()
});

export const BaseArticleMetadaSchema = z.object({
	id: z.string(),
	title: z.string(),
	authors: z.array(AuthorSchema).optional(),
	content: z.string().optional(),
	views: z.number().optional(),
	summary: z.string(),
	categories: z.array(CategorySchema),
	thumb: z.string(),
	slug: z.string(),
	is_sponsored: z.boolean().optional(),
	sponsor_color: z
		.string()
		.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/)
		.optional()
		.default('#FFFFFF'),
	sponsor_text_color: z
		.string()
		.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/)
		.optional()
		.default('#000000'),
	related_articles: z.array(RelatedArticleSchema).optional()
});

export const ArticleMetadaSchema = BaseArticleMetadaSchema.transform((article) => {
	const {
		is_sponsored,
		sponsor_color,
		sponsor_text_color,
		related_articles,
		...rest
	} = article;
	return {
		...rest,
		isSponsored: is_sponsored,
		sponsorColor: sponsor_color,
		sponsorTextColor: sponsor_text_color,
		relatedArticles: related_articles || []
	};
});

export const ArticleMetadataArraySchema = z.array(ArticleMetadaSchema);
export type ArticleMetadata = z.infer<typeof ArticleMetadaSchema>;

const TableOfContentsItemSchema: z.ZodType<TableOfContentsItem> = z.lazy(() =>
	z.object({
		title: z.string(),
		id: z.string(),
		children: z.array(TableOfContentsItemSchema)
	})
);

export const TableOfContentsSchema = z.array(TableOfContentsItemSchema);
export type TableOfContentsItem = {
	title: string;
	id: string;
	children: TableOfContentsItem[];
};
export type TableOfContents = z.infer<typeof TableOfContentsSchema>;

export const ArticleSchema = BaseArticleMetadaSchema.extend({
	content: z.string(),
	scheduled_publish_time: z.string(),
	table_of_contents: TableOfContentsSchema,
	acknowledgement: z.string().optional(),
	authors: z.array(AuthorSchema.transform((author) => ({
		username: author.username,
		fullName: author.full_name,
		twitterUsername: author.twitter_username
	})))
}).transform((article) => ({
	...article,
	scheduledPublishTime: article.scheduled_publish_time,
	tableOfContents: article.table_of_contents,
	relatedArticles: article.related_articles || []
}));

export type Article = z.infer<typeof ArticleSchema>;
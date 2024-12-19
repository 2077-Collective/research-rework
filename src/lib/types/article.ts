import { z } from 'zod';

// Basic schemas
const CategorySchema = z.object({
	name: z.string()
});

export const AuthorSchema = z.object({
	username: z.string(),
	id: z.string(),
	full_name: z.string(),
	twitter_username: z.string().nullable()
});

const CommonArticleFields = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	thumb: z.string(),
	categories: z.array(CategorySchema),
	summary: z.string()
});

const BaseArticleSchema = CommonArticleFields.extend({
	authors: z.array(AuthorSchema),
	min_read: z.number(),
	created_at: z.string()
});

export const ArticleMetadataSchema = CommonArticleFields.extend({
	authors: z.array(AuthorSchema).optional(),
	content: z.string().optional(),
	views: z.number().optional(),
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
	related_articles: z.array(BaseArticleSchema).optional(),
	updated_at: z.string().optional().default(new Date().toISOString())
});

export const TransformedArticleMetadataSchema = ArticleMetadataSchema.transform((article) => {
	const { is_sponsored, sponsor_color, sponsor_text_color, related_articles, updated_at, ...rest } =
		article;
	return {
		...rest,
		isSponsored: is_sponsored,
		sponsorColor: sponsor_color,
		sponsorTextColor: sponsor_text_color,
		relatedArticles: related_articles || [],
		updatedAt: updated_at
	};
});

export const ArticleMetadataArraySchema = z.array(TransformedArticleMetadataSchema);
export type ArticleMetadata = z.infer<typeof TransformedArticleMetadataSchema>;

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

export const FullArticleSchema = ArticleMetadataSchema.extend({
	content: z.string(),
	scheduled_publish_time: z.string(),
	table_of_contents: TableOfContentsSchema,
	acknowledgement: z.string().optional(),
	gpt_summary: z.string().optional(),
	authors: z.array(
		AuthorSchema.transform((author) => ({
			username: author.username,
			fullName: author.full_name,
			twitterUsername: author.twitter_username
		}))
	)
}).transform((article) => ({
	...article,
	scheduledPublishTime: article.scheduled_publish_time,
	tableOfContents: article.table_of_contents,
	relatedArticles: article.related_articles || [],
	updatedAt: article.updated_at,
	gptSummary: article.gpt_summary
}));

export type Article = z.infer<typeof FullArticleSchema>;

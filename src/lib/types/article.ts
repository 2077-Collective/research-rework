import { z } from 'zod';

// Define Zod schemas
const CategorySchema = z.object({
	name: z.string()
});

export const BaseArticleMetadaSchema = z.object({
	id: z.string(),
	title: z.string(),
	authors: z
		.array(
			z.object({
				username: z.string(),
				id: z.string(),
				full_name: z.string(),
				twitter_username: z.string().nullable()
			})
		)
		.optional(),
	content: z.string().optional(),
	views: z.number().optional(),
	summary: z.string(),
	categories: z.array(CategorySchema),
	thumb: z.string(),
	slug: z.string(),
	is_sponsored: z.boolean().optional(),
	sponsor_color: z.string().optional(),
	sponsor_text_color: z.string().optional()
});

export const ArticleMetadaSchema = BaseArticleMetadaSchema.transform((article) => ({
	...article,
	isSponsored: article.is_sponsored,
	sponsorColor: article.sponsor_color,
	sponsorTextColor: article.sponsor_text_color
}));

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
	authors: z.array(
		z
			.object({
				username: z.string(),
				full_name: z.string(),
				twitter_username: z.string().nullable()
			})
			.transform((author) => ({
				username: author.username,
				fullName: author.full_name,
				twitterUsername: author.twitter_username
			}))
	)
}).transform((article) => ({
	...article,
	scheduledPublishTime: article.scheduled_publish_time,
	tableOfContents: article.table_of_contents
}));
export type Article = z.infer<typeof ArticleSchema>;

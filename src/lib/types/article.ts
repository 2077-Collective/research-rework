import { z } from 'zod';

// Define Zod schemas
const CategorySchema = z.object({
	name: z.string()
});

const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgba?\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])(%?)\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])(%?)\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])(%?)\s*(?:,\s*(0?\.\d+|1|0))?\s*\)$/;
const paddingRegex = /^p[txbylr]/;

const SponsorFieldsSchema = z.object({
	is_sponsored: z.boolean().optional(),
	sponsor_color: z.string().regex(colorRegex, 'Invalid color format').optional(),
	sponsor_text_color: z.string().regex(colorRegex, 'Invalid color format').optional(),
	sponsor_padding: z.string().regex(paddingRegex, 'Invalid padding format').optional(),
});

export const ArticleMetadataSchema = SponsorFieldsSchema.extend({
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
});

export const ArticleMetadataArraySchema = z.array(ArticleMetadataSchema);
export type ArticleMetadata = z.infer<typeof ArticleMetadataSchema>;

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

export const ArticleSchema = ArticleMetadataSchema.extend({
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


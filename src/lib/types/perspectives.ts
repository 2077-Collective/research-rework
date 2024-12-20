import { z } from 'zod';
import { AuthorSchema } from './article';

const Company = z.object({
	name: z.string(),
	logo: z.string()
});

export const PerspectivesAuthorSchema = AuthorSchema.extend({
	avatar: z.string(),
	company: Company.optional(),
	role: z.string().optional(),
	bio: z.string().optional()
});
export type PerspectivesAuthor = z.infer<typeof PerspectivesAuthorSchema>;

export const PerspectivesArticleMetadataSchema = z
	.object({
		title: z.string(),
		subtitle: z.string(),
		description: z.string(),
		author: PerspectivesAuthorSchema,
		created_at: z.string(),
		updated_at: z.string(),
		read_time: z.number(),
		slug: z.string(),
		categories: z.array(z.string())
	})
	.transform((data) => {
		return {
			...data,
			createdAt: new Date(data.created_at),
			updatedAt: new Date(data.updated_at),
			readTime: data.read_time
		};
	});
export const PerspectivesArticleMetadataArraySchema = z.array(PerspectivesArticleMetadataSchema);
export type PerspectivesArticleMetadata = z.infer<typeof PerspectivesArticleMetadataSchema>;

export const PerspectivesArticleSchema = z.object({
	metadata: PerspectivesArticleMetadataSchema,
	title: z.string(),
	description: z.string(),
	subtitle: z.string(),
	content: z.string()
});
export type PerspectivesArticle = z.infer<typeof PerspectivesArticleSchema>;

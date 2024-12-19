import { z } from 'zod';
import { AuthorSchema } from './article';
import { content } from 'googleapis/build/src/apis/content';
import { SlashSquare } from 'lucide-svelte';

const CompanySchema = z.object({
	name: z.string(),
	logo: z.string()
});

export const PerspectivesAuthorSchema = AuthorSchema.extend({
	avatar: z.string(),
	company: CompanySchema.optional(),
	role: z.string().optional(),
	bio: z.string().optional()
});

export const PerspectivesArticleMetadataSchema = z
	.object({
		author: PerspectivesAuthorSchema,
		created_at: z.string(),
		updated_at: z.string(),
		read_time: z.number(),
		slug: z.string()
	})
	.transform((data) => {
		return {
			...data,
			createdAt: new Date(data.created_at),
			updatedAt: new Date(data.updated_at),
			readTime: data.read_time
		};
	});

export const PerspectivesArticleSchema = z.object({
	metadata: PerspectivesArticleMetadataSchema,
	title: z.string(),
	description: z.string(),
	subtitle: z.string(),
	content: z.string()
});

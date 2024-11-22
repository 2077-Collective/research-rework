import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { z } from 'zod';

const OPENAI_CLIENT = new OpenAI({
	apiKey: OPENAI_API_KEY
});

const reviewSchema = z.object({
	review: z.array(
		z.object({
			change: z.string(),
			original: z.string(),
			suggestion: z.string()
		})
	)
});

const promptResponseSchema = {
	type: 'json_schema',
	json_schema: {
		name: 'review',
		schema: {
			type: 'object',
			properties: {
				review: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							change: { type: 'string' },
							original: { type: 'string' },
							suggestion: { type: 'string' }
						},
						required: ['change', 'original', 'suggestion'],
						additionalProperties: false
					}
				}
			},
			required: ['review'],
			additionalProperties: false
		},
		strict: true
	}
} as const;

export interface Review {
	review: {
		change: string;
		original: string;
		suggestion: string;
	}[];
}

export function getEditorSuggestions(article: string): Promise<Review> {
	return runAgent(
		`
		As an experienced editor and markdown expert, please perform a comprehensive review of the following blog post. Your objectives are:

	    1. Cohesion and Flow: Assess the logical structure and flow of the content, ensuring smooth transitions between sections and overall cohesiveness.
	    2. Grammar and Spelling: Identify and correct any grammatical errors, spelling mistakes, or awkward phrasing to enhance clarity and readability.
	    3. Semantic Accuracy: Verify that the content is semantically correct, with all statements accurately conveying the intended meaning without ambiguity.

		This going to be sent to an email, so the string returned be valid a valid html document.
	    `
	)(article);
}

export function runAgent(agentPrompt: string) {
	return async (userPrompt: string): Promise<Review> => {
		const response = await OPENAI_CLIENT.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: agentPrompt
				},
				{
					role: 'user',
					content: userPrompt
				}
			],
			response_format: promptResponseSchema,
			model: 'gpt-4o',
			stream: false
		});

		const responseContent = response.choices[0].message.content;

		if (!responseContent) {
			throw new Error('No response from GPT');
		}

		return reviewSchema.parse(JSON.parse(responseContent));
	};
}

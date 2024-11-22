import { getEditorSuggestions } from '$lib/server/services/gpt.service';
import type { InsertArticle, InsertAuthor } from '../schema';
import { sendReviewEmail } from './email.service';

export async function reviewArticle(article: InsertArticle, author: InsertAuthor) {
	if (!article.articleContent) {
		throw new Error('Article content is required');
	}

	const suggestions = await getEditorSuggestions(article.articleContent);

	await sendReviewEmail(article, author, suggestions);

	return suggestions;
}

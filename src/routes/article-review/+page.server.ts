import { insertArticleSchema, insertAuthorSchema } from '$lib/server/schema';
import { createArticle } from '$lib/server/services/article.service';
import { reviewArticle } from '$lib/server/services/review.service';
import { error, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	requestArticleReview: async ({ request }) => {
		const formData = await request.formData();
		const formDataObj = Object.fromEntries(formData);
		const { name, email, telegram, x, discord, ...articleData } = formDataObj;
		const author = { name, email, telegram, x, discord };

		const parsedAuthor = insertAuthorSchema.parse(author);
		const parsedArticle = insertArticleSchema.parse(articleData);

		if (!parsedArticle.linkToArticle && !parsedArticle.articleContent) {
			throw error(400, 'Link to article or article content is required');
		}

		if (parsedArticle.linkToArticle && !isLinkValid(parsedArticle.linkToArticle)) {
			throw error(
				400,
				'The link you provided is not valid. Please make sure it is a valid Google Docs or HackMD link.'
			);
		}

		await createArticle(parsedArticle, parsedAuthor);

		if (parsedArticle.articleContent) {
			reviewArticle(parsedArticle, parsedAuthor)
				.then(() => console.log('Article reviewed'))
				.catch((error) => {
					console.error('Error reviewing article', error);
				});
		}

		return { success: true };
	}
};

function isLinkValid(link: string) {
	return link.includes('docs.google.com');
}

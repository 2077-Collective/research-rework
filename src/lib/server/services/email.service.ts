import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import type { Review } from './gpt.service';
import type { InsertArticle, InsertAuthor } from '../schema';

const resend = new Resend(RESEND_API_KEY);

export async function sendReviewEmail(
	article: InsertArticle,
	author: InsertAuthor,
	review: Review
) {
	return resend.emails.send({
		from: '2077 Research <community@2077.xyz>',
		to: author.email,
		subject: `Review of ${article.articleTitle}`,
		html: buildReviewEmailBody(article.articleTitle, author.name, review)
	});
}

export function buildReviewEmailBody(title: string, author: string, review: Review): string {
	return `
    <h1>Review - ${title}</h1>

    <p>Hello ${author},</p>
    <p>First of all, thank you for submitting your article to 2077 Research. We really appreciate your contribution!</p>
    <p>This is a preliminary review, and we will get in touch with a more detailed review soon.</p>
    <p>Here are the suggested changes for your article:</p>
	<br />
    ${review.review
			.map(
				({ change, original, suggestion }) =>
					`<h2>${change}</h2>
					<p><strong>Original:</strong> ${original}</p>
					<p><strong>Suggestion:</strong> ${suggestion}</p>
					<hr />
					<br />
					`
			)
			.join('')}
    `;
}

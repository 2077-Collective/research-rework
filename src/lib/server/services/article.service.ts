import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import {
	articles,
	authors,
	type InsertArticle,
	type InsertAuthor,
	type SelectArticle
} from '../schema';
import { fetchGoogleDocAsMarkdown } from './google-docs.service';
import { createdTeamNote } from './hackmd.service';

export async function createArticle(
	article: Omit<InsertArticle, 'authorId'>,
	author: InsertAuthor
) {
	const { id: authorId } = await getOrCreateAuthor(author);

	// If both article content and link are provided, we use the link to fetch the content
	if (article.linkToArticle) {
		article.articleContent = await fetchArticleContentFromLink(article.linkToArticle);
	} else if (article.articleContent) {
		const { publishLink } = await createdTeamNote(article.articleTitle, article.articleContent);
		article.linkToArticle = publishLink;
	}

	const [newArticle] = await db
		.insert(articles)
		.values({ ...article, authorId })
		.returning();

	return newArticle;
}

export async function getAllArticles(): Promise<SelectArticle[]> {
	return await db.query.articles.findMany();
}

export async function getOrCreateAuthor(author: InsertAuthor) {
	const existingAuthor = await db.query.authors.findFirst({
		where: eq(authors.email, author.email)
	});

	if (existingAuthor) {
		return existingAuthor;
	}

	const [newAuthor] = await db.insert(authors).values(author).returning();
	return newAuthor;
}

export async function fetchArticleContentFromLink(link: string) {
	if (link.includes('docs.google.com')) {
		return fetchGoogleDocAsMarkdown(link);
	}

	throw new Error('Invalid article link');
}

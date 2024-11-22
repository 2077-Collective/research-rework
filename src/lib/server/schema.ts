import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const articles = pgTable('articles', {
	id: serial('id').primaryKey(),
	authorId: integer('author_id').references(() => authors.id),
	articleTitle: text('article_title').notNull(),
	articleDescription: text('article_description').notNull(),
	additionalNotes: text('additional_notes'),

	// Need to provide either link to article or article content
	linkToArticle: text('link_to_article'),
	articleContent: text('article_content'),

	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date())
});

export const article_relations = relations(articles, ({ one }) => ({
	author: one(authors, {
		fields: [articles.authorId],
		references: [authors.id]
	})
}));

export const authors = pgTable('authors', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	telegram: text('telegram'),
	x: text('x'),
	discord: text('discord'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const author_relations = relations(authors, ({ many }) => ({
	articles: many(articles)
}));

export type InsertArticle = typeof articles.$inferInsert;
export type SelectArticle = typeof articles.$inferSelect;
export const insertArticleSchema = createInsertSchema(articles);

export type InsertAuthor = typeof authors.$inferInsert;
export type SelectAuthor = typeof authors.$inferSelect;
export const insertAuthorSchema = createInsertSchema(authors);

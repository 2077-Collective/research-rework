ALTER TABLE "articles" ADD COLUMN "is_repost" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "original_link" text;
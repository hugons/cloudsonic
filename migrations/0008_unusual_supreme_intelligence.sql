CREATE TABLE `pages` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`userId` text NOT NULL,
	`image` text,
	`images` text,
	`tags` text,
	`createdOn` integer,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
CREATE INDEX `pageSlugIndex` ON `pages` (`slug`);--> statement-breakpoint
CREATE INDEX `pageUserIdIndex` ON `pages` (`userId`);--> statement-breakpoint
CREATE INDEX `pageStatusIndex` ON `pages` (`status`);
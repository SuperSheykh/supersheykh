CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`title_fr` text NOT NULL,
	`description` text NOT NULL,
	`description_fr` text NOT NULL,
	`slug` text NOT NULL,
	`slug_fr` text NOT NULL,
	`cover` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_title_unique` ON `projects` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_title_fr_unique` ON `projects` (`title_fr`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_fr_unique` ON `projects` (`slug_fr`);
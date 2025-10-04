CREATE TABLE `blogs` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`title_fr` text NOT NULL,
	`content` text NOT NULL,
	`content_fr` text NOT NULL,
	`cover` text,
	`createdAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);--> statement-breakpoint
CREATE TABLE `skill_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`name_fr` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `skill_categories_name_unique` ON `skill_categories` (`name`);--> statement-breakpoint
CREATE TABLE `skills` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`name_fr` text,
	`category_id` text,
	FOREIGN KEY (`category_id`) REFERENCES `skill_categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `skills_name_unique` ON `skills` (`name`);--> statement-breakpoint
CREATE TABLE `socials` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `socials_name_unique` ON `socials` (`name`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`title_fr` text NOT NULL,
	`description` text NOT NULL,
	`description_fr` text NOT NULL,
	`slug` text NOT NULL,
	`cover` text NOT NULL,
	`live` text NOT NULL,
	`github` text,
	`created_at` text,
	`updated_at` text,
	FOREIGN KEY (`cover`) REFERENCES `images`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "title", "title_fr", "description", "description_fr", "slug", "cover", "live", "github", "created_at", "updated_at") SELECT "id", "title", "title_fr", "description", "description_fr", "slug", "cover", "live", "github", "created_at", "updated_at" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `projects_title_unique` ON `projects` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_title_fr_unique` ON `projects` (`title_fr`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `projects` (`title`);--> statement-breakpoint
CREATE INDEX `title_fr_idx` ON `projects` (`title_fr`);--> statement-breakpoint
CREATE INDEX `slug_idx` ON `projects` (`slug`);
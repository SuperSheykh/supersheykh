CREATE TABLE `policies` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`title_fr` text NOT NULL,
	`content` text NOT NULL,
	`content_fr` text NOT NULL,
	`version` text DEFAULT '1.0' NOT NULL,
	`published` integer DEFAULT true NOT NULL,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `policies_slug_unique` ON `policies` (`slug`);
ALTER TABLE `images` ADD `key` text NOT NULL;--> statement-breakpoint
ALTER TABLE `images` ADD `url` text NOT NULL;--> statement-breakpoint
ALTER TABLE `images` ADD `filename` text NOT NULL;--> statement-breakpoint
ALTER TABLE `images` ADD `size` integer;--> statement-breakpoint
ALTER TABLE `images` ADD `type` text;--> statement-breakpoint
ALTER TABLE `images` ADD `uploadedAt` text NOT NULL;
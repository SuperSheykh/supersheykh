PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_billboards` (
	`id` text PRIMARY KEY NOT NULL,
	`greeting` text,
	`greeting_fr` text,
	`title` text NOT NULL,
	`title_fr` text NOT NULL,
	`description` text,
	`description_fr` text,
	`button_text` text NOT NULL,
	`button_text_fr` text NOT NULL,
	`button_link` text NOT NULL,
	`image_alt` text,
	`sub_text` text,
	`sub_text_fr` text,
	`sub_link` text,
	`sub_link_text` text,
	`sub_link_text_fr` text
);
--> statement-breakpoint
INSERT INTO `__new_billboards`("id", "greeting", "greeting_fr", "title", "title_fr", "description", "description_fr", "button_text", "button_text_fr", "button_link", "image_alt", "sub_text", "sub_text_fr", "sub_link", "sub_link_text", "sub_link_text_fr") SELECT "id", "greeting", "greeting_fr", "title", "title_fr", "description", "description_fr", "button_text", "button_text_fr", "button_link", "image_alt", "sub_text", "sub_text_fr", "sub_link", "sub_link_text", "sub_link_text_fr" FROM `billboards`;--> statement-breakpoint
DROP TABLE `billboards`;--> statement-breakpoint
ALTER TABLE `__new_billboards` RENAME TO `billboards`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_images` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`filename` text,
	`size` integer,
	`type` text,
	`uploadedAt` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_images`("id", "key", "filename", "size", "type", "uploadedAt") SELECT "id", "key", "filename", "size", "type", "uploadedAt" FROM `images`;--> statement-breakpoint
DROP TABLE `images`;--> statement-breakpoint
ALTER TABLE `__new_images` RENAME TO `images`;--> statement-breakpoint
CREATE UNIQUE INDEX `images_key_unique` ON `images` (`key`);
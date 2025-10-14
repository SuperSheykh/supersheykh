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
	`sub_text` text,
	`sub_text_fr` text,
	`sub_link` text,
	`sub_link_text` text,
	`sub_link_text_fr` text,
	`image_key` text NOT NULL,
	FOREIGN KEY (`image_key`) REFERENCES `images`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_billboards`("id", "greeting", "greeting_fr", "title", "title_fr", "description", "description_fr", "button_text", "button_text_fr", "button_link", "sub_text", "sub_text_fr", "sub_link", "sub_link_text", "sub_link_text_fr", "image_key") SELECT "id", "greeting", "greeting_fr", "title", "title_fr", "description", "description_fr", "button_text", "button_text_fr", "button_link", "sub_text", "sub_text_fr", "sub_link", "sub_link_text", "sub_link_text_fr", "image_key" FROM `billboards`;--> statement-breakpoint
DROP TABLE `billboards`;--> statement-breakpoint
ALTER TABLE `__new_billboards` RENAME TO `billboards`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `images_key_unique`;--> statement-breakpoint
ALTER TABLE `images` ADD `alt` text;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `key`;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `filename`;
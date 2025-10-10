PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`quote` text DEFAULT '' NOT NULL,
	`quote_fr` text DEFAULT '' NOT NULL,
	`author` text NOT NULL,
	`live` text DEFAULT '1'
);
--> statement-breakpoint
INSERT INTO `__new_quotes`("id", "quote", "quote_fr", "author", "live") SELECT "id", "quote", "quote_fr", "author", "live" FROM `quotes`;--> statement-breakpoint
DROP TABLE `quotes`;--> statement-breakpoint
ALTER TABLE `__new_quotes` RENAME TO `quotes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
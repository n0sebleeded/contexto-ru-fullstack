CREATE TABLE `daily_word` (
	`id` integer PRIMARY KEY NOT NULL,
	`word_id` integer NOT NULL,
	`date` text NOT NULL,
	FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `words` (
	`id` integer PRIMARY KEY NOT NULL,
	`word` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `daily_word_date_unique` ON `daily_word` (`date`);
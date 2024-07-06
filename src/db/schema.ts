import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from "drizzle-orm";

export const words = sqliteTable('words', {
    id: integer('id').primaryKey(),
    word: text('word').notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const dailyWord = sqliteTable('daily_word', {
    id: integer('id').primaryKey(),
    wordId: integer('word_id').references(() => words.id).notNull(),
    date: text('date').unique().notNull(),
});


export type InsertWord = typeof words.$inferInsert;
export type SelectWord = typeof words.$inferSelect;

export type InsertDailyWord = typeof dailyWord.$inferInsert;
export type SelectDailyWord = typeof dailyWord.$inferSelect;

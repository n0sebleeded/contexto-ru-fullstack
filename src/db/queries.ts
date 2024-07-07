import { eq, sql } from 'drizzle-orm';
import { words, dailyWord } from './schema';
import { db } from "./index.ts";

export async function getRandomWord(): Promise<
    Array<{
        id: number;
        word: string;
        createdAt: string;
    }>
> {
    return db
        .select()
        .from(words)
        .orderBy(sql.raw("RANDOM()"))
        .limit(1);
}

export async function getWordsById(id: number): Promise<
    Array<{
        id: number;
        word: string;
        createdAt: string;
    }>
> {
    return db
        .select()
        .from(words)
        .where(eq(words.id, id))
        .limit(1);
}
export async function getDailyWord(): Promise<
    Array<{
        id: number;
        wordId: number;
        date: string;
    }>
> {
    return db
        .select()
        .from(dailyWord)
        .limit(1);
}

export async function updateDailyWord(data: number) {
    await db.update(dailyWord).set({wordId: data}).where(eq(dailyWord.id, 1));
}

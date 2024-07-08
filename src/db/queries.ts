import { asc, eq } from 'drizzle-orm';
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
        .orderBy(asc(words.id));
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
    {
        id: number;
        date: string;
        wordId: number
    } | undefined
> {
    const currDate = new Date(Date.now());
    return db
        .query
        .dailyWord
        .findFirst({
        where: (table, func) => func.eq(table.date, `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`)
    });
}

export async function updateDailyWord(data: number) {
    const date = new Date(Date.now());
    return db
        .update(dailyWord)
        .set({
            wordId: data,
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`})
        .where(eq(dailyWord.id, 1))
        .returning({
            id: dailyWord.id,
            wordId: dailyWord.wordId,
            date: dailyWord.date,
        })
}
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "node:child_process";
//import {getDailyWord, getRandomWord, updateDailyWord} from "../../../db/queries.ts";

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    const path = process.env.NEXT_PUBLIC_SCRIPT_PATH;

    try {
        const searchParams = req.nextUrl.searchParams;
        const word = searchParams.get("word");
        const response = await pythonExec(path, word);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error executing Python script:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

const pythonExec = async (path: string | undefined, word: string | null) => {
    return new Promise((resolve, reject) => {
        const py = spawn('python', [`${path} ${word} ручка`], { shell: true });

        py.stdout.on('data', function (data) {
            console.log(data.toString());
            resolve(data.toString());
        });

        py.stderr.on('data', (data) => {
            console.log(data.toString());
            reject(data.toString());
        });
    });
};

//fix update-word
/*
const dailyWord = async () => {
    // Проверка, существует ли уже слово на сегодня
    const existingDailyWord = await getDailyWord();

    if (existingDailyWord.length > 0) {
        return existingDailyWord[0];
    }

    // Получение случайного слова из таблицы words
    const randomWord = await getRandomWord()

    if (randomWord.length > 0) {
        await updateDailyWord({
            id: 1,
            date: new Date().toISOString(),
            wordId: randomWord[0].id
        });
        return await getDailyWord();
    }

    throw new Error('Нет доступных слов для выбора');
}*/

import { NextRequest, NextResponse } from "next/server";
import { spawn } from "node:child_process";
import {getDailyWord, getRandomWord, getWordsById, updateDailyWord} from "../../../db/queries.ts";

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

const pythonExec = async (path: string | undefined, wordInput: string | null) => {
    return new Promise((resolve, reject) => {
        dailyWord().then((result) => {
            if (!result || !result.wordId) {
                console.error("No wordId found in the daily word result:", result);
                reject("No wordId found in the daily word result");
                return;
            }
            getWordsById(result.wordId).then((word) => {
                if (!word || word.length === 0) {
                    console.error("No words found with the given wordId:", result.wordId);
                    reject("No words found with the given wordId");
                    return;
                }
                const dWord = word[0].word;
                const py = spawn('python', [`${path} ${wordInput} ${dWord}`], { shell: true });

                py.stdout.on('data', function (data) {
                    resolve(data.toString());
                });

                py.stderr.on('data', (data) => {
                    reject(data.toString());
                });
            }).catch((error) => {
                console.error("Error getting words by ID:", error);
                reject(`Error getting words by ID: ${error}`);
            });
        }).catch((error) => {
            console.error("Error getting daily word:", error);
            reject(`Error getting daily word: ${error}`);
        });
    });
};

const dailyWord = async () => {
    try {
        const existingDailyWord = await getDailyWord();
        console.log("Exist daily word: ", existingDailyWord);
        if (existingDailyWord.length > 0) {
            console.log("Existing daily word:", existingDailyWord[0]);
            return existingDailyWord[0];
        }

        const randomWord = await getRandomWord();
        console.log("Random word: ", randomWord);
        if (randomWord.length > 0) {
            await updateDailyWord(randomWord[0].id);
            const result = await getDailyWord();
            console.log("New daily word:", result);
            return result[0];
        }

        throw new Error('Нет доступных слов для выбора');
    } catch (error) {
        console.error("Error in dailyWord function:", error);
        throw error;
    }
}
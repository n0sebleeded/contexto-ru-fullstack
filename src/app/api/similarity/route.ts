import { NextRequest, NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { getDailyWord, getRandomWord, getWordsById, updateDailyWord } from "../../../db/queries.ts";
import { DailyWord, ProcessWordFunc, PythonExecFunc } from "./@types.ts";

export const dynamic = 'force-dynamic';
let cachedDailyWord: DailyWord | null = null;

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

const pythonExec: PythonExecFunc = async (path, wordInput) => {
    return new Promise((resolve, reject) => {
        if (cachedDailyWord) {
            processWord(cachedDailyWord, path, wordInput, resolve, reject);
        } else {
            dailyWord().then((result) => {
                if (!result || !result.wordId) {
                    console.error("No wordId found in the daily word result:", result);
                    reject("No wordId found in the daily word result");
                    return;
                }
                cachedDailyWord = result;
                processWord(result, path, wordInput, resolve, reject);
            }).catch((error) => {
                console.error("Error getting daily word:", error);
                reject(`Error getting daily word: ${error}`);
            });
        }
    });
};

const processWord: ProcessWordFunc = (
    result,
    path,
    wordInput,
    resolve,
    reject
) => {
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
};

const dailyWord = async () => {
    try {
        const existingDailyWord = await getDailyWord();
        const date = new Date(existingDailyWord[0].date);
        const currDate = new Date(Date.now());
        if (date.getDate() === currDate.getDate() && date.getMonth() === currDate.getMonth()) {
            console.log("Existing daily word:", existingDailyWord[0]);
            return existingDailyWord[0];
        }

        //need tests
        const randomWord = await getRandomWord();
        if (randomWord.length > 0) {
            await updateDailyWord(randomWord[0].id);
            const result = await getDailyWord();
            return result[0];
        }

        throw new Error('Нет доступных слов для выбора');
    } catch (error) {
        console.error("Error in dailyWord function:", error);
        throw error;
    }
}

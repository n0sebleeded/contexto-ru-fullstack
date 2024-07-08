import { NextRequest, NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { getRandomWord, getWordsById, updateDailyWord } from "../../../db/queries.ts";
import { DailyWord, ProcessWordFunc, PythonExecFunc } from "./@types.ts";

export const dynamic = 'force-dynamic';
let cachedDailyWord: DailyWord | null = null;
let playerWin = false;

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
        //random word game mode cond.
        //TODO: remove after rework game modes.
        if (cachedDailyWord && !playerWin) {
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
        wordInput === dWord ? playerWin = true : playerWin = false;
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
        //FIXME: FIX SELECT!
        /*const currDate = new Date(Date.now());
        const existingDailyWord = await db.query.dailyWord.findMany();
        console.log(existingDailyWord);
        if (existingDailyWord) {
            return existingDailyWord[0];
        }*/

        //random word(working game mode)
        const randomWord = await getRandomWord();
        if (randomWord.length > 0) {
            const randSeed = Math.floor(Math.random() * randomWord.length);
            console.log(randomWord[randSeed]);
            const result = await updateDailyWord(randomWord[randSeed].id);
            return result[0];
        }
    } catch (error) {
        console.error("Error in dailyWord function:", error);
        throw error;
    }
}

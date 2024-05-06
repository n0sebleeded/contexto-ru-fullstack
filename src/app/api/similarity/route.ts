import { NextResponse } from "next/server";
import { spawn } from "node:child_process";

export async function GET(req: Request) {
    const path = process.env.NEXT_PUBLIC_SCRIPT_PATH;

    const { searchParams } = new URL(req.url);
    const word = searchParams.get("word");

    try {
        const response = await pythonExec(path, word);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error executing Python script:", error);
        return NextResponse.error();
    }
}

export const pythonExec = async (path: string | undefined, word: string | null) => {
    return new Promise((resolve, reject) => {
        const py = spawn('python', [`${path} ${word} ручка`], {shell: true});

        py.stdout.on('data', function(data) {
            console.log(data.toString());
            resolve(data.toString());
        });

        py.stderr.on('data', (data) => {
            console.log(data.toString());
            reject(data.toString());
        });
    });
};

import {NextRequest, NextResponse} from "next/server";
import { spawn } from "node:child_process";

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    const path = process.env.NEXT_PUBLIC_SCRIPT_PATH;

    try {
        const searchParams= req.nextUrl.searchParams;
        const word = searchParams.get("word");
        console.log(word);
        const response = await pythonExec(path, word);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error executing Python script:", error);
        return NextResponse.error();
    }
}

const pythonExec = async (path: string | undefined, word: string | null) => {
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

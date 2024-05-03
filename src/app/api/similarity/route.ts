import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get("word");
    console.log(word);

    return NextResponse.json(1000);
}
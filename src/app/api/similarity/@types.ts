export type DailyWord = {
    id: number;
    wordId: number;
    date: string;
}
export type Word = {
    id: number;
    word: string;
    createdAt: string;
}
export type Resolve = (value: string) => void
export type Reject = (reason: any) => void
export type Path = string | undefined
export type WordInput = string | null
export type ProcessWordFunc = (
    result: DailyWord,
    path: Path,
    wordInput: WordInput,
    resolve: Resolve,
    reject: Reject
) => void
export type PythonExecFunc = (path: Path, wordInput: WordInput) => Promise<unknown>

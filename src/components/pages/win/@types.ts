export enum CSymbol {
    green = "🟩",
    orange = "🟨",
    red = "🟥",
}

export type Color = {
    green: number,
    orange: number,
    red: number,
}
export type RenderColorSymbolsProps = {
    color: number;
    symbol: string;
}
export type WinTextProps = {
    guesses: number;
}
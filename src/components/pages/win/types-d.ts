export enum CSymbol {
    green = "🟩",
    orange = "🟨",
    red = "🟥",
}

export interface IColor {
    green: number,
    orange: number,
    red: number,
}

export interface IRenderColorSymbolsProps {
    color: number;
    symbol: string;
}

export interface IWinTextProp {
    guesses: number;
}

export interface IDropdownFaq {
    isClicked: boolean
}
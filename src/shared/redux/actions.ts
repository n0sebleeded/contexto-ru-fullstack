import React from "react";

export interface IRootStateGame {
    gameState: {
        word: string,
        isStarted: boolean
        guesses: IGuess[];
        lastGuess: IGuess;
        wordDoesNotExist: boolean;
        wordLengthError: boolean;
        wordRepeat: boolean;
        playerWin: boolean;
        counter: IColor,
    }
}

export interface IGuess  {
    key:string,
    value: number,
    isLoading?: boolean
}

export interface IColor {
    green: number,
    orange: number,
    red: number
}

export interface IHandleSubmitActionProps {
    word: string,
    setWord: React.Dispatch<React.SetStateAction<string>>,
}
export interface IRootStateGame {
    gameState: {
        isStarted: boolean
        guesses: { key: string; value: number }[];
        lastGuess: {key: string; value: number, isLoading: boolean};
        wordDoesNotExist: boolean;
        wordLengthError: boolean;
        wordRepeat: boolean;
    }
}
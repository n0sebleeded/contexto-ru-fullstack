import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IColor, IGuess} from "../actions.ts";

export interface IGameState {
    word: string,
    isStarted: boolean;
    guesses: IGuess[];
    lastGuess: IGuess;
    wordDoesNotExist: boolean;
    wordLengthError: boolean;
    wordRepeat: boolean;
    playerWin: boolean;
    counter: IColor
}

const initialState: IGameState = {
    word: "",
    isStarted: false,
    guesses: [],
    lastGuess: { key: "", value: 0, isLoading: false },
    wordDoesNotExist: false,
    wordLengthError: false,
    wordRepeat: false,
    playerWin: false,
    counter: { green: 0, orange: 0, red: 0 }
};


const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        setWord(state, action: PayloadAction<{ word: string }>) {
            state.word = action.payload.word;
        },
        setGameState(state, action: PayloadAction<{ isStarted: boolean }>) {
            state.isStarted = action.payload.isStarted;
        },
        addGuess(state, action: PayloadAction<{ key: string; value: number; isLoading: boolean }>) {
            // Добавляем новое угадывание в массив угадываний
            state.guesses.push({key: action.payload.key, value: action.payload.value});
            state.lastGuess = action.payload;
            state.guesses.sort((a, b) => a.value - b.value);
        },
        clearGuesses(state) {
            state.guesses = [];
        },
        setLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.lastGuess.isLoading = action.payload.isLoading;
        },
        setWordExistence(state, action: PayloadAction<{ wordDoesNotExist: boolean }>) {
            state.wordDoesNotExist = action.payload.wordDoesNotExist;
        },
        setError(state, action:PayloadAction<{ wordLengthError: boolean }>) {
            state.wordLengthError = action.payload.wordLengthError;
        },
        setWordRepeat(state, action: PayloadAction<{ wordRepeat: boolean }>) {
            state.wordRepeat = action.payload.wordRepeat;
        },
        setPlayerWin(state, action: PayloadAction<{ playerWin: boolean }>) {
            state.playerWin = action.payload.playerWin;
        },
        setCounter(state, action: PayloadAction<{counter: { green: number, orange: number, red: number }}>) {
            state.counter = action.payload.counter;
        },
        countColors(state, action: PayloadAction<{val: number}>) {
            const temp = { red: 0, orange: 0, green: 0 };

            if (action.payload.val > 800) temp.red++;
            else if (action.payload.val > 500) temp.orange++;
            else temp.green++;

            const newCounter = {
                orange: state.counter.orange + temp.orange,
                green: state.counter.green + temp.green,
                red: state.counter.red + temp.red,
            };

            setCounter({ counter: newCounter });
        },
    },
});

// Экспортируем экшены, сгенерированные createSlice
export const { setGameState, addGuess, setWord,
    setLoading, setWordExistence, setError,
    setWordRepeat, setPlayerWin, setCounter,
    countColors } = gameStateSlice.actions;

// Экспортируем функцию редюсера, сгенерированную createSlice
export default gameStateSlice.reducer;

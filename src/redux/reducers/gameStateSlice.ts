import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
    isStarted: boolean;
    guesses: { key: string; value: number }[];
    lastGuess: { key: string; value: number, isLoading: boolean };
    wordDoesNotExist: boolean;
    wordLengthError: boolean;
    wordRepeat: boolean;
    playerWin: boolean;
    counter: { green: number, orange: number, red: number }
}

const initialState: GameState = {
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
        }
    },
});

// Экспортируем экшены, сгенерированные createSlice
export const { setGameState, addGuess,
    clearGuesses, setLoading,
    setWordExistence, setError,
    setWordRepeat, setPlayerWin,
    setCounter } = gameStateSlice.actions;

// Экспортируем функцию редюсера, сгенерированную createSlice
export default gameStateSlice.reducer;

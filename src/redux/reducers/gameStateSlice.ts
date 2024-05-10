import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем начальное состояние интерфейса
interface GameState {
    isStarted: boolean;
    guesses: { key: string; value: number }[];
    lastGuess: { key: string; value: number, isLoading: boolean };
    wordDoesNotExist: boolean;
    wordLengthError: boolean;
    wordRepeat: boolean;
}

const initialState: GameState = {
    isStarted: false,
    guesses: [],
    lastGuess: { key: "", value: 0, isLoading: false },
    wordDoesNotExist: false,
    wordLengthError: false,
    wordRepeat: false,
};


// Создаем slice с именем burgerSlice с использованием createSlice из Redux Toolkit
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
        }
    },
});

// Экспортируем экшены, сгенерированные createSlice
export const { setGameState, addGuess, clearGuesses, setLoading, setWordExistence, setError, setWordRepeat } = gameStateSlice.actions;

// Экспортируем функцию редюсера, сгенерированную createSlice
export default gameStateSlice.reducer;

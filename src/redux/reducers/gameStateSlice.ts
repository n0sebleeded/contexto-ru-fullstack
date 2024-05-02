import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем начальное состояние интерфейса
interface GameState {
    isStarted: boolean;
    guesses: { key: string; value: number }[];
    lastGuess: { key: string; value: number, isLoading: boolean };
}

const initialState: GameState = {
    isStarted: false,
    guesses: [],
    lastGuess: { key: "", value: 0, isLoading: false },
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
        toggleLoading(state) {
            state.lastGuess = {key: state.lastGuess.key, value: state.lastGuess.value, isLoading: !state.lastGuess.isLoading};
        }
    },
});

// Экспортируем экшены, сгенерированные createSlice
export const { setGameState, addGuess, clearGuesses, toggleLoading } = gameStateSlice.actions;

// Экспортируем функцию редюсера, сгенерированную createSlice
export default gameStateSlice.reducer;

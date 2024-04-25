import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем начальное состояние интерфейса
interface GameState {
    isStarted: boolean;
    guesses: { key: string; value: number }[];
}

const initialState: GameState = {
    isStarted: false,
    guesses: [],
};

// Создаем slice с именем burgerSlice с использованием createSlice из Redux Toolkit
const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        setGameState(state, action: PayloadAction<{ isStarted: boolean }>) {
            state.isStarted = action.payload.isStarted;
        },
        addGuess(state, action: PayloadAction<{ key: string; value: number }>) {
            // Добавляем новое угадывание в массив угадываний
            state.guesses.push(action.payload);
        },
        clearGuesses(state) {
            state.guesses = [];
        },
        sortGuesses(state) {
            state.guesses.sort((a, b) => a.value - b.value);
        }
    },
});

// Экспортируем экшены, сгенерированные createSlice
export const { setGameState, addGuess, clearGuesses, sortGuesses } = gameStateSlice.actions;

// Экспортируем функцию редюсера, сгенерированную createSlice
export default gameStateSlice.reducer;

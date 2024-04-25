import {configureStore} from "@reduxjs/toolkit";
import gameStateReducer from "./reducers/gameStateSlice.ts";
const store = configureStore({
    reducer: {
        gameState: gameStateReducer,
    }
});

export default store;
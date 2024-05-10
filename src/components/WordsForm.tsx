import React, { useState } from 'react';
import './components-style/word-form.css'
import InfoBar from "./InfoBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    addGuess,
    setGameState,
    setWordExistence,
    setError,
    setWordRepeat, setLoading, setPlayerWin, setCounter
} from "../redux/reducers/gameStateSlice.ts";
import axios from "axios";
import {IRootStateGame} from "../redux/actions.ts";

//TODO:temp solution
//export const guessedWord = "ручка";

const WordsForm: React.FC = () => {
	const guessList = useSelector((state : IRootStateGame) => state.gameState.guesses);
    const playerWin = useSelector((state: IRootStateGame) => state.gameState.playerWin)
    const SERVER_URL = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL;
    const counterSelector = useSelector((state:IRootStateGame) => state.gameState.counter);

    const dispatch = useDispatch();
    const [word, setWord] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    //TODO: ??? REDUX BUG FIX
    const countColors = (val: number): void => {
        const temp = { red: 0, orange: 0, green: 0 };

        if (val > 800) temp.red++;
        else if (val > 500) temp.orange++;
        else temp.green++;

        const newCounter = {
            orange: counterSelector.orange + temp.orange,
            green: counterSelector.green + temp.green,
            red: counterSelector.red + temp.red,
        };

        dispatch(setCounter({ counter: newCounter }));
    };


    //TODO: FIX FREQ WIN POS!;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let wordRepeat:boolean = false;
        dispatch(setLoading({isLoading: true}));
        dispatch(setWordExistence({wordDoesNotExist: false}));
        dispatch(setError({wordLengthError: false}))

        if (word.length) {
            dispatch(setGameState({isStarted: true}));
            if (word == "ручка") {
                dispatch(setPlayerWin({playerWin: true}))
                dispatch(addGuess({key: "ручка", value: 1, isLoading: false}));
                return;
            }
            for (const item of guessList) {
                if (item.key == word) {
                    dispatch(setWordRepeat({wordRepeat: true}))
                    wordRepeat = true;
                }
            }
            if (!wordRepeat) {
                if (word.includes(" ")) {
                    dispatch(setError({wordLengthError: true}));
                } else {
                    setWord("");
                    axios.get(`${SERVER_URL}/api/similarity?word=${word}`)
                        .then((response) => {
                            if (!Number.isNaN(+response.data)) {
                                countColors(+response.data);
                                dispatch(addGuess({key: word, value: +response.data, isLoading: false}));
                                console.log(counterSelector);
                            } else {
                                dispatch(setWordExistence({wordDoesNotExist: true}));
                            }
                            dispatch(setError({wordLengthError: false}));
                            dispatch(setLoading({isLoading: false}));
                        })
                        .catch((reason) => {
                            console.log(reason);
                        })
                }
            }
        }
    };

    return (
        <div className="word-form">
            <InfoBar />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="wordInput"
                    placeholder="type a word"
                    id="WI"
                    value={word}
                    onChange={handleChange}
                    className="word"
                    disabled={playerWin}
                />
            </form>
        </div>
    );
};

export default WordsForm;

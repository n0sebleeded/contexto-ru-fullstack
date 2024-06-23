import React, { useState } from 'react';
import './word-form.css'
import InfoBar from "./InfoBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    addGuess,
    setGameState,
    setWordExistence,
    setError,
    setWordRepeat, setLoading, setCounter
} from "../../../shared/redux/reducers/gameStateSlice.ts";
import axios from "axios";
import {IRootStateGame} from "../../../shared/redux/actions.ts";


const WordsForm: React.FC = () => {
    const {playerWin, lastGuess,
        counter, guesses, wordRepeat} = useSelector((state: IRootStateGame) => state.gameState)

    const SERVER_URL = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL;

    const dispatch = useDispatch();
    const [word, setWord] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    const countColors = (val: number): void => {
        const temp = { red: 0, orange: 0, green: 0 };

        if (val > 800) temp.red++;
        else if (val > 500) temp.orange++;
        else temp.green++;

        const newCounter = {
            orange: counter.orange + temp.orange,
            green: counter.green + temp.green,
            red: counter.red + temp.red,
        };

        dispatch(setCounter({ counter: newCounter }));
    };

    const handleNothingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return false;
    }

    //TODO: restucture
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(setLoading({isLoading: true}));
        dispatch(setWordExistence({wordDoesNotExist: false}));
        dispatch(setError({wordLengthError: false}))

        if (word.length) {
            dispatch(setGameState({isStarted: true}));
            for (const item of guesses) {
                if (item.key == word) {
                    dispatch(setWordRepeat({wordRepeat: true}))
                    return;
                }
            }
            if (!wordRepeat) {
                if (word.includes(" ")) {
                    dispatch(setError({wordLengthError: true}));
                    dispatch(setLoading({isLoading: false}));
                } else {
                    //TODO: ?????
                    setWord("");
                    ApiRequest();
                }
            }
        } else {
            dispatch(setLoading({isLoading: false}));
            dispatch(setWordExistence({wordDoesNotExist: false}));
            dispatch(setError({wordLengthError: true}))
        }
    };

    const ApiRequest = () => {
        axios.get(`${SERVER_URL}/api/similarity?word=${word}`)
            .then((response) => {
                if (!Number.isNaN(+response.data)) {
                    countColors(+response.data);
                    dispatch(addGuess({key: word, value: +response.data, isLoading: false}));
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

    return (
        <div className="word-form">
            <InfoBar />
            <form onSubmit={lastGuess.isLoading ? handleNothingSubmit : handleSubmit} role="form">
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
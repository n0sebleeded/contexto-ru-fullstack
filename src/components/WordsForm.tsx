import React, { useState } from 'react';
import './components-style/word-form.css'
import InfoBar from "./InfoBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    addGuess,
    setGameState,
    setWordExistence,
    setError,
    setWordRepeat, setLoading
} from "../redux/reducers/gameStateSlice.ts";
import axios from "axios";
import {IRootStateGame} from "../redux/actions.ts";

const WordsForm: React.FC = () => {
	const guessList = useSelector((state : IRootStateGame) => state.gameState.guesses);
    
    const SERVER_URL = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL;

    const dispatch = useDispatch();
    const [word, setWord] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let wordRepeat:boolean = false;
        dispatch(setLoading({isLoading: true}));
        dispatch(setWordExistence({wordDoesNotExist: false}));
        dispatch(setError({wordLengthError: false}))

        if (word.length) {
            dispatch(setGameState({isStarted: true}));
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
                            console.log(response);
                            if (!Number.isNaN(+response.data)) {
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
                />
            </form>
        </div>
    );
};

export default WordsForm;

import React, { useState } from 'react';
import './components-style/word-form.css'
import InfoBar from "./InfoBar.tsx";
import {useDispatch} from "react-redux";
import {addGuess, setGameState, toggleLoading} from "../redux/reducers/gameStateSlice.ts";
import axios from "axios";

const WordsForm: React.FC = () => {
    const SERVER_PORT = process.env.NEXT_PUBLIC_REACT_APP_SERVER_IP;
    const SERVER_IP = process.env.NEXT_PUBLIC_REACT_APP_SERVER_PORT;

    const dispatch = useDispatch();
    const [word, setWord] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(toggleLoading());

        if (word.length) {
            setWord("");
            dispatch(setGameState({isStarted: true}));
            axios.get(`${SERVER_IP}:${SERVER_PORT}/api/similarity?word=${word}`)
                .then((response) => {
                    console.log(response);
                    dispatch(addGuess({key: word, value: response.data, isLoading: false}));
                })
                .catch((reason) => {
                    console.log(reason);
                })
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

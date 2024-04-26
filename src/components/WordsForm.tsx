import React, { useState } from 'react';
import './components-style/word-form.css'
import InfoBar from "./InfoBar.tsx";
import {useDispatch} from "react-redux";
import {addGuess, setGameState} from "../redux/reducers/gameStateSlice.ts";

const WordsForm: React.FC = () => {
    const dispatch = useDispatch();
    const [word, setWord] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (word.length) {
            setWord("");
            dispatch(setGameState({isStarted: true}));
            dispatch(addGuess({key: word, value: Math.ceil(Math.random() * 100)}))
        }
        // axios or other form submission logic can go here
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

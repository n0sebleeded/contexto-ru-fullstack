import React, { useState } from 'react';
import './components-style/word-form.css'
import InfoBar from "./InfoBar.tsx";

const WordsForm: React.FC = () => {
    const [word, setWord] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(word);
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

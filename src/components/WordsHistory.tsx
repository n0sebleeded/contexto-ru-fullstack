import React, {useEffect, useState} from 'react';
import WordsAns from "./WordsAns.tsx";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {IRootStateGame} from "../redux/actions.ts";
import {sortGuesses} from "../redux/reducers/gameStateSlice.ts";

//TODO: implement linked list?
const WordsHistory:React.FC = () => {
    const localStorage = useSelector((state: IRootStateGame) => state.gameState.guesses);
    const dispatch = useDispatch();
    const [currentWord, setCurrentWord] = useState({word: "", val: 0});
    /*useEffect(() => {
        Axios request --> value;
        kvArray += value;
        kvArray.sort((a, b) => a.value - a.value);
        last = key;
    }, [kvArray]);*/

    useEffect(() => {
        const lastNode = localStorage[localStorage.length - 1].key;
        const elements = document.querySelectorAll("#wrapper");

        elements.forEach(element => {
            const textContent = element.textContent;
            const textWithoutNumbers= textContent ? textContent.replace(/\d+/g, '') : "";
            const numberWithoutText = textContent ? textContent.replace(/\D/g, '') : "";

            console.log(textWithoutNumbers == lastNode);
            if (textWithoutNumbers == lastNode) {
                element.classList.add("current");
                setCurrentWord({word: textWithoutNumbers, val: +numberWithoutText});
            }
        });

        dispatch(sortGuesses());
    }, [localStorage]);

    return (
        <>
            <div className="message">
                <WordsAns className="current" key={uuidv4()} word={currentWord.word} value={currentWord.val} />
            </div>
            {localStorage.map(({key, value}) => (
                key == currentWord.word
                    ? <WordsAns className="current" key={uuidv4()} word={key} value={value} />
                    : <WordsAns key={uuidv4()} word={key} value={value} />
            ))}
        </>
    );
};

export default WordsHistory;
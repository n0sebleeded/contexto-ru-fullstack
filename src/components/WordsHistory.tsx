import React, {useEffect, useState} from 'react';
import WordsAns from "./WordsAns.tsx";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {IRootStateGame} from "../redux/actions.ts";
import {sortGuesses} from "../redux/reducers/gameStateSlice.ts";
import Popup from "./motion-components/Popup.tsx";

//TODO: implement linked list?
const WordsHistory:React.FC = () => {
    const localStorage = useSelector((state: IRootStateGame) => state.gameState.guesses);
    const lastNode = useSelector((state:IRootStateGame) => state.gameState.lastGuess);
    const dispatch = useDispatch();
    const [currentWord, setCurrentWord] = useState({word: "", val: 0});
    /*useEffect(() => {
        Axios request --> value;
        kvArray += value;
        kvArray.sort((a, b) => a.value - a.value);
        last = key;
    }, [kvArray]);*/

    useEffect(() => {
        const elements = document.querySelectorAll("#wrapper");

        elements.forEach(element => {
            const textContent = element.textContent;
            const textWithoutNumbers= textContent ? textContent.replace(/\d+/g, '') : "";

            if (textWithoutNumbers == lastNode.key) {
                element.classList.add("current");
                setCurrentWord({word: lastNode.key, val: +lastNode.value});
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
                    ? <Popup key={uuidv4()}>
                        <WordsAns className="current" key={uuidv4()} word={key} value={value} />
                      </Popup>
                    : <Popup key={uuidv4()}>
                        <WordsAns key={uuidv4()} word={key} value={value} />
                      </Popup>
            ))}
        </>
    );
};

export default WordsHistory;
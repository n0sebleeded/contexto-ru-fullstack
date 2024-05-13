import React, {useEffect, useState} from 'react';
import WordsAns from "./WordsAns.tsx";
import { v4 as uuidv4 } from 'uuid';
import {useSelector} from "react-redux";
import {IGuess, IRootStateGame} from "../../../shared/redux/actions.ts";
import Popup from "../../motion-components/Popup.tsx";
import WaveText from "../../motion-components/WaveText.tsx";
import FadeInOut from "../../motion-components/FadeInOut.tsx";
import {AnimatePresence} from "framer-motion";
import {IGameState} from "../../../shared/redux/reducers/gameStateSlice.ts";

const WordsHistory:React.FC = () => {
    const { wordDoesNotExist,
        guesses,
        lastGuess,
        wordLengthError,
        wordRepeat
    }: IGameState = useSelector((state: IRootStateGame) => state.gameState);
    const [, setCurrentWord] = useState({word: "", val: 0});

    useEffect(() => {
        const elements = document.querySelectorAll("#wrapper");

        elements.forEach(element => {
            const textContent = element.textContent;
            const textWithoutNumbers= textContent ? textContent.replace(/\d+/g, '') : "";

            if (textWithoutNumbers == lastGuess.key) {
                element.classList.add("current");
                setCurrentWord({word: lastGuess.key, val: +lastGuess.value});
            }
        });
    }, [guesses]);

    const component = renderComponent(wordLengthError, wordRepeat, wordDoesNotExist, lastGuess);

    return (
        <>
            <div className="message">
                <AnimatePresence mode="wait">
                    <FadeInOut key={uuidv4()}>
                        {component}
                    </FadeInOut>
                </AnimatePresence>
            </div>
                {guesses.map(({key, value}) => (
                    key == lastGuess.key && !lastGuess.isLoading
                        ? <Popup key={uuidv4()}>
                            <WordsAns className="current" key={uuidv4()} word={key} value={value} />
                          </Popup>
                        : <WordsAns key={uuidv4()} word={key} value={value} />

                ))}
        </>
    );
};

export default WordsHistory;


function renderComponent(wordLengthError: boolean, wordRepeat: boolean, wordDoesNotExist: boolean, lastGuess: IGuess) {
    if (wordLengthError) {
        return <WaveText text="Используйте только одно слово" />;
    }

    if (wordRepeat) {
        return <WaveText text="Это слово уже было загадано" />;
    }

    if (!lastGuess.isLoading && !wordDoesNotExist) {
        return <WordsAns className="current" word={lastGuess.key} value={lastGuess.value} />;
    }

    return <WaveText text={wordDoesNotExist ? "Мы не знаем такого слова😔" : "Рассчитываем..."} />;
}

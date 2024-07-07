import React, { useEffect, useState } from 'react';
import WordsAns from "./WordsAns.tsx";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { IGuess, IRootStateGame } from "../../../shared/redux/actions.ts";
import WaveText from "../../motion-components/WaveText.tsx";
import { AnimatePresence } from "framer-motion";
import { IGameState } from "../../../shared/redux/reducers/gameStateSlice.ts";
import MotionDiv from "../../motion-components/MotionDiv.tsx";
import { fadeInOut, popup } from "../../motion-components/vars.ts";

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
                //TODO: hmmm
                setCurrentWord({word: lastGuess.key, val: +lastGuess.value});
            }
        });
    }, [guesses]);

    const component = renderComponent(wordLengthError, wordRepeat, wordDoesNotExist, lastGuess);

    return (
        <>
            <div className="message">
                <AnimatePresence mode="wait">
                    <MotionDiv variant={fadeInOut} key={uuidv4()}>
                        {component}
                    </MotionDiv>
                </AnimatePresence>
            </div>
                {guesses.map(({key, value}) => (
                    key == lastGuess.key && !lastGuess.isLoading
                        ? <MotionDiv variant={popup} key={uuidv4()}>
                            <WordsAns className="current" key={uuidv4()} word={key} value={value} />
                          </MotionDiv>
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

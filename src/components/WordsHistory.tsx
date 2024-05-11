import React, {useEffect, useState} from 'react';
import WordsAns from "./WordsAns.tsx";
import { v4 as uuidv4 } from 'uuid';
import {useSelector} from "react-redux";
import {IRootStateGame} from "../redux/actions.ts";
import Popup from "./motion-components/Popup.tsx";
import WaveText from "./motion-components/WaveText.tsx";
import FadeInOut from "./motion-components/FadeInOut.tsx";
import {AnimatePresence} from "framer-motion";

const WordsHistory:React.FC = () => {
    const wordDoesNotExist = useSelector((state: IRootStateGame) => state.gameState.wordDoesNotExist);
    const localStorage = useSelector((state: IRootStateGame) => state.gameState.guesses);
    const lastNode = useSelector((state:IRootStateGame) => state.gameState.lastGuess);
    const hasError = useSelector((state: IRootStateGame) => state.gameState.wordLengthError);
    const wordRepeat = useSelector((state : IRootStateGame) => state.gameState.wordRepeat);

    const [, setCurrentWord] = useState({word: "", val: 0});

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
    }, [localStorage]);

    let component;
    if (hasError) {
        component = <WaveText text="Используйте только одно слово" />
    } else {
        if (wordRepeat) {
            component = <WaveText text="Это слово уже было загадано" />
        } else {
            if (!lastNode.isLoading) {
                if (wordDoesNotExist) {
                    component = <WaveText text="Мы не знаем такого слова😔" />
                } else {
                    component = <WordsAns className="current" word={lastNode.key} value={lastNode.value} />
                }
            } else {
                component = <WaveText text="Рассчитываем..." />
            }
        }
    }

    return (
        <>
            <div className="message">
                <AnimatePresence mode="wait">
                    <FadeInOut key={uuidv4()}>
                        {component}
                    </FadeInOut>
                </AnimatePresence>
            </div>
                {localStorage.map(({key, value}) => (
                    key == lastNode.key && !lastNode.isLoading
                        ? <Popup key={uuidv4()}>
                            <WordsAns className="current" key={uuidv4()} word={key} value={value} />
                          </Popup>
                        : <WordsAns key={uuidv4()} word={key} value={value} />

                ))}
        </>
    );
};

export default WordsHistory;
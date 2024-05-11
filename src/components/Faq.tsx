import React, {useState} from 'react';
import {Typography} from "@mui/material";
import './components-style/faq.css';
import SlideIn from "./motion-components/SlideIn.tsx";
import {AnimatePresence} from "framer-motion";
import {v4 as uuidv4} from "uuid";
import FadeInOut from "./motion-components/FadeInOut.tsx";

const Faq:React.FC = () => {

    const [isClicked, setClicked] = useState(false);

    function onSubmit(e:React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        setClicked(!isClicked);
        console.log(isClicked)
    }

    return (
        <div className="FAQ">
            <Typography variant="h2" className="text">
                <img src="../../FAQsquare.svg" alt="FAQs" className="img"/>
                &nbsp;FAQ
            </Typography>
            <div className="question" style={{ borderBottom: "1px solid white"}}>
                <div className="sub-question">
                    <Typography variant="h3" className="text">
                        Подробнее про navec.
                    </Typography>
                    <button onClick={(e) => onSubmit(e)}>
                        <Typography variant="h3" className="arrow">
                            <img src="../../arrow.svg" alt="arrow"/>
                        </Typography>
                    </button>
                </div>
                <AnimatePresence mode="wait">
                    {isClicked &&
                        <SlideIn key={uuidv4()}>
                            <FadeInOut key={uuidv4()}>
                                <Typography variant="h3" className="text">
                                    navec - это python библиотека для векторизации слов на русском языке. Она показывает более высокие результаты, чем RusVectores, загружается в 10 раз быстрее (~1 сек) и занимает в 10 раз меньше места (~50 МБ). С помощью неё был сделан python скрипт, сравнивающий насколько близко находится вектор секретного слова и слова, вводимого пользователем. Далее число проходит через функцию, которая приводит значения расстояния двух слов к более привычному виду.
                                </Typography>
                            </FadeInOut>
                        </SlideIn>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Faq;
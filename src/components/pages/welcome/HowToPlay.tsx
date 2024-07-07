import React from 'react';
import { Typography } from "@mui/material";
import './how-to-play.css';
import Faq from "./Faq.tsx";

const HowToPlay:React.FC = () => {
    return (
        <>
            <div className="howToPlay">
                <Typography variant="h2" className="text" sx={{paddingBottom: '5px', alignItems: 'center'}}>
                    <img src="../../FAQ.svg" alt="FAQ" className="img"/>
                    &nbsp;Правила игры
                </Typography>
                <Typography variant="h3" className="text">
                    Найдите секретное слово. У вас есть неограниченное количество вариантов угадывания.
                </Typography>
                <Typography variant="h3" className="text">
                    Числовое значение ассоциации двух слов происходит с помощью python библиотеки navec, ссылку на который вы можете найти в описании репозитория.
                </Typography>
                <Typography variant="h3" className="text">
                    После ввода слова вы увидите его числовое значение ассоциации. Секретное слово имеет числовое значение равное 1.
                </Typography>
            </div>
            <Faq/>
        </>
    );
};

export default HowToPlay;
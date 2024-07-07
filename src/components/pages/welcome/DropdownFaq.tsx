import React from 'react';
import MotionDiv from "../../motion-components/MotionDiv.tsx";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { DropdownFaqProps } from "./@types.ts";
import { fadeInOut, slidein } from "../../motion-components/vars.ts";

const DropdownFaq:React.FC<DropdownFaqProps> = ({isClicked}) => {
    return (
        <AnimatePresence mode="wait">
            {isClicked &&
                <MotionDiv variant={slidein} key={uuidv4()}>
                    <MotionDiv variant={fadeInOut} key={uuidv4()}>
                        <Typography variant="h3" className="text">
                            navec - это python библиотека для векторизации слов на русском языке. Она показывает более высокие результаты, чем RusVectores, загружается в 10 раз быстрее (~1 сек) и занимает в 10 раз меньше места (~50 МБ). С помощью неё был сделан python скрипт, сравнивающий насколько близко находится вектор секретного слова и слова, вводимого пользователем. Далее число проходит через функцию, которая приводит значения расстояния двух слов к более привычному виду.
                        </Typography>
                    </MotionDiv>
                </MotionDiv>
            }
        </AnimatePresence>
    );
};

export default DropdownFaq;
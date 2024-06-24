import React from 'react';
import "./words-ans.css";
import { Typography } from "@mui/material";
import { IColors, IWordsAnsProps } from "./types-d.ts";

const WordsAns: React.FC<IWordsAnsProps> = ({ word, value, className }) => {
    const { width, color } = calculateWidthAndColor(value);

    return (
        <div className="words-ans">
            <div className={"row-wrapper " + className} id="wrapper">
                <div className="outer-bar">
                    <div className='inner-bar' style={{ width: `${width}%`, backgroundColor: color }}></div>
                </div>
                <div className="row">
                    <Typography variant="h4" sx={{ textTransform: 'lowercase', fontSize: "18px" }}>
                        {word}
                    </Typography>
                    <Typography variant="h4" sx={{ textTransform: 'lowercase', fontSize: "18px" }}>
                        {value}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

const calculateWidthAndColor = (value:number) => {
    let width = value;
    let color = IColors.RED;

    if (value > 3500) {
        width = 1;
    } else {
        width = Math.exp(Math.log(100) - value / 800); //important
        color = value > 800 ? IColors.RED : value > 500 ? IColors.ORANGE : IColors.GREEN;
    }

    return { width, color };
};

export default WordsAns;

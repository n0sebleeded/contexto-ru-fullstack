import React from 'react';
import "./components-style/words-ans.css";
import {Typography} from "@mui/material";

const WordsAns:React.FC = () => {
    //Axios request --> value

    enum IColors {
        RED = "#f91880",
        ORANGE = "#ef7d31",
        GREEN = "#00ba7c",
    }

    const val = 180;
    let width = 0;
    let color = IColors.RED;

    if (val > 3500) {
        width = 1;
    } else {
        width = Math.exp(Math.log(100) - val/800); //important
        width > 800 ? color = IColors.RED : width > 500 ? color = IColors.ORANGE : color = IColors.GREEN;
    }

    return (
        <div className="words-ans">
            <div className="row-wrapper">
                <div className="outer-bar">
                    <div className='inner-bar' style={{width: `${width}%`, backgroundColor: color}}></div>
                </div>
                <div className="row">
                    <Typography variant="h4" sx={{textTransform: 'lowercase', fontSize: "18px"}}>
                        Ящерица
                    </Typography>
                    <Typography variant="h4" sx={{textTransform: 'lowercase', fontSize: "18px"}}>
                        {val}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default WordsAns;
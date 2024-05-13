import React from 'react';
import {Typography} from "@mui/material";
import {IWinTextProp} from "./types-d.ts";

const WinText:React.FC<IWinTextProp> = ({guesses}) => {
    return (
        <>
            <Typography variant="h2" className="win-text-bigger" sx={{marginTop: '10px', paddingBottom: '5px', alignItems: 'center'}}>
                Поздравляем!
            </Typography>
            <Typography variant="h3" className="win-text">
                Вы отгадали слово #123
            </Typography>
            <Typography variant="h3" className="win-text" sx={{marginTop: '-3px'}}>
                за {guesses} попыток
            </Typography>
        </>
    );
};

export default WinText;
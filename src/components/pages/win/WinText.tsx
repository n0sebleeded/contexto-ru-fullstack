import React from 'react';
import { Typography } from "@mui/material";
import { WinTextProps } from "./@types.ts";

const WinText:React.FC<WinTextProps> = ({guesses}) => {
    return (
        <>
            <Typography variant="h2" role='win-page-text-check' className="win-text-bigger" sx={{marginTop: '10px', paddingBottom: '5px', alignItems: 'center'}}>
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
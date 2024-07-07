import React from 'react';
import { Typography } from "@mui/material";

const WinPageButtons = () => {
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="win-btn" role="button-share">
                    <div style={{width: '222px'}}>
                        Поделиться
                    </div>
                </button>
            </div>

            <Typography variant="h3" className="win-text" sx={{marginTop: '25px', marginBottom: '5px'}}>
                Сыграть еще раз:
            </Typography>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="win-btn" role="button-prev-games">
                    Предыдущие игры
                </button>
            </div>
        </>
    );
};

export default WinPageButtons;
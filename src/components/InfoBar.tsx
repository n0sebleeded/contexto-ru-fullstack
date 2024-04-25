import React from 'react';
import {Typography} from "@mui/material";
import './components-style/info-bar.css'

const InfoBar:React.FC = () => {
    return (
        <div className="info-bar">
            <Typography variant="h4" sx={{ display: "flex", alignItems: "end" }}>
                GAME:&nbsp;
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', margin: 0 }}>
                #123&nbsp;&nbsp;
            </Typography>

            <Typography variant="h4" sx={{ display: "flex", alignItems: "end" }}>
                GUESSES:&nbsp;
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', margin: 0 }}>
                0&nbsp;&nbsp;
            </Typography>
        </div>
    );
};

export default InfoBar;
import React from 'react';
import {Typography} from "@mui/material";
import './info-bar.css'
import {useSelector} from "react-redux";
import {IRootStateGame} from "../../../shared/redux/actions.ts";

const InfoBar:React.FC = () => {
    const count = useSelector((state: IRootStateGame) => state.gameState.guesses).length
    return (
        <div className="info-bar">
            <Typography variant="h4" sx={{ display: "flex", alignItems: "end" }}>
                GAME:&nbsp;
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: '800', fontSize: 18, margin: 0 }}>
                #123&nbsp;&nbsp;
            </Typography>

            <Typography variant="h4" sx={{ display: "flex", alignItems: "end" }}>
                GUESSES:&nbsp;
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', margin: 0 }}>
                {count}&nbsp;&nbsp;
            </Typography>
        </div>
    );
};

export default InfoBar;
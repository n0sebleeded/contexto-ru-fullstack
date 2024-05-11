import React from 'react';
import {Typography} from "@mui/material";
import '../components/components-style/win-page.css'
import {useSelector} from "react-redux";
import {IRootStateGame} from "../redux/actions.ts";

enum CSymbol {
    green = "🟩",
    orange = "🟨",
    red = "🟥",
}

interface IColor {
    green: number,
    orange: number,
    red: number,
}

const WinPage:React.FC = () => {
    const guesses = useSelector((state: IRootStateGame) => state.gameState.guesses.length);
    const colors:IColor = useSelector((state:IRootStateGame) => state.gameState.counter);

    return (
        <div className="win">
            <Typography variant="h2" className="win-text-bigger" sx={{marginTop: '10px', paddingBottom: '5px', alignItems: 'center'}}>
                Поздравляем!
            </Typography>
            <Typography variant="h3" className="win-text">
                Вы отгадали слово #123
            </Typography>
            <Typography variant="h3" className="win-text" sx={{marginTop: '-3px'}}>
                за {guesses} попыток
            </Typography>
            <div className="chart-wrapper">
                <div className="chart">
                    {[...Array(colors.green)].map((_, index) => (
                        <span key={index}>{CSymbol.green}</span>
                    ))} {colors.green > 0 && colors.green}
                    {colors.orange !== 0 &&
                        <br />
                    }
                    {[...Array(colors.orange)].map((_, index) => (
                        <span key={index}>{CSymbol.orange}</span>
                    ))} {colors.orange > 0 && colors.orange}
                    {colors.red !== 0 &&
                        <br />
                    }
                    {[...Array(colors.red)].map((_, index) => (
                        <span key={index}>{CSymbol.red}</span>
                    ))} {colors.red > 0 && colors.red}
                </div>

            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="win-btn">
                    <div style={{width: '222px'}}>
                        Поделиться
                    </div>
                </button>
            </div>

            <Typography variant="h3" className="win-text" sx={{marginTop: '25px', marginBottom: '5px'}}>
                Сыграть еще раз:
            </Typography>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="win-btn">
                    Предыдущие игры
                </button>
            </div>
        </div>
    );
};

export default WinPage;
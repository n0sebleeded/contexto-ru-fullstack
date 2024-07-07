import React from 'react';
import './win-page.css'
import { useSelector } from "react-redux";
import { IRootStateGame } from "../../../shared/redux/actions.ts";
import { Color, CSymbol } from "./@types.ts";
import RenderColorSymbols from "./RenderColorSymbols.tsx";
import WinText from "./WinText.tsx";
import WinPageButtons from "./WinPageButtons.tsx";

const WinPage:React.FC = () => {
    const guesses = useSelector((state: IRootStateGame) => state.gameState.guesses.length);
    const colors:Color = useSelector((state:IRootStateGame) => state.gameState.counter);

    return (
        <div className="win">
            <WinText guesses={guesses} />
            <div className="chart-wrapper">
                <div className="chart">
                    {<RenderColorSymbols color={colors.green} symbol={CSymbol.green} />}
                    {<RenderColorSymbols color={colors.orange} symbol={CSymbol.orange} />}
                    {<RenderColorSymbols color={colors.red} symbol={CSymbol.red} />}
                </div>
            </div>
            <WinPageButtons />
        </div>
    );
};

export default WinPage;
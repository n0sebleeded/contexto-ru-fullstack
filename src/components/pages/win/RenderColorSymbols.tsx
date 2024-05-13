import React from 'react';
import {IRenderColorSymbolsProps} from "./types-d.ts";

const RenderColorSymbols:React.FC<IRenderColorSymbolsProps> = ({color, symbol}) => {
    return (
        <>
            {[...Array(color)].map((_, index) => (
                <span key={index}>{symbol}</span>
            ))} {color > 0 && color}
            {color !== 0 && <br />}
        </>
    );
};

export default RenderColorSymbols;


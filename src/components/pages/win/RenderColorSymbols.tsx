import React from 'react';
import { RenderColorSymbolsProps } from "./@types.ts";

const RenderColorSymbols:React.FC<RenderColorSymbolsProps> = ({color, symbol}) => {
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


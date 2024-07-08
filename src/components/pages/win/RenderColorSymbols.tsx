import React from 'react';
import { RenderColorSymbolsProps } from "./@types.ts";

const RenderColorSymbols:React.FC<RenderColorSymbolsProps> = ({color, symbol}) => {
    return (
        <>
            //FIXME: red & green br tag fix
            {[...Array(color)].map((_, index) => (
                <span key={index}>{symbol}</span>
            ))} {color > 0 && color}
            {color !== 0 && <br />}
        </>
    );
};

export default RenderColorSymbols;


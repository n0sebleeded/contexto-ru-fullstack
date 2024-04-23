import React from 'react';
import {Typography} from "@mui/material";
import './components-style/how_to_play.css';

const HowToPlay:React.FC = () => {
    return (
        <div className="howToPlay">
            <Typography variant="h2" className="text">How to play</Typography>
            <Typography variant="h3" className="text">
                Find the secret word. You have unlimited guesses.
            </Typography>
            <Typography variant="h3" className="text">
                The words were sorted by an artificial intelligence algorithm according to how similar they were to the secret word.
            </Typography>
            <Typography variant="h3" className="text">
                After submitting a word, you will see its position. The secret word is number 1.
            </Typography>
            <Typography variant="h3" className="text">
                The algorithm analyzed thousands of texts. It uses the context in which words are used to calculate the similarity between them.
            </Typography>
        </div>
    );
};

export default HowToPlay;
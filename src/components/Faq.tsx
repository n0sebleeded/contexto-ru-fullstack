import React, {useState} from 'react';
import {Typography} from "@mui/material";
import './components-style/faq.css';
import SlideIn from "./motion-components/SlideIn.tsx";
import {AnimatePresence} from "framer-motion";
import {v4 as uuidv4} from "uuid";
import FadeInOut from "./motion-components/FadeInOut.tsx";

const Faq:React.FC = () => {

    const [isClicked, setClicked] = useState(false);

    function onSubmit(e:React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        setClicked(!isClicked);
        console.log(isClicked)
    }

    return (
        <div className="FAQ">
            <Typography variant="h2" className="text">
                <img src="../../FAQsquare.svg" alt="FAQs" className="img"/>
                &nbsp;FAQ
            </Typography>
            <div className="question" style={{ borderBottom: "1px solid white"}}>
                <div className="sub-question">
                    <Typography variant="h3" className="text">
                        How is the word order defined?
                    </Typography>
                    <button onClick={(e) => onSubmit(e)}>
                        <Typography variant="h3" className="arrow">
                            <img src="../../arrow.svg" alt="arrow"/>
                        </Typography>
                    </button>
                </div>
                <AnimatePresence mode="wait">
                    {isClicked &&
                        <SlideIn key={uuidv4()}>
                            <FadeInOut key={uuidv4()}>
                                <Typography variant="h3" className="text">
                                    The game uses an artificial intelligence algorithm and thousands of texts to calculate the similarity of the words in relation to the word of the day. Not necessarily it is related to the meaning of the words, but to the proximity in which they are used on the internet. For example, if the word of the day were “infinite”, words related to “love” or words related to “universe” might be close to the word of the day because “infinite” is commonly used in those two different contexts. In similar reasoning, if “tv” and “television”, for example, are in very different positions, it means that they are used differently in relation to the word of the day, despite being the same object.
                                </Typography>
                            </FadeInOut>
                        </SlideIn>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Faq;
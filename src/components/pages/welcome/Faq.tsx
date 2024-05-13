import React, {useState} from 'react';
import {Typography} from "@mui/material";
import '../../components-style/faq.css';
import DropdownFaq from "./DropdownFaq.tsx";

const Faq:React.FC = () => {
    const [isClicked, setClicked] = useState(false);

    return (
        <div className="FAQ">
            <Typography variant="h2" className="text">
                <img src="../../FAQsquare.svg" alt="FAQs" className="img"/>
                &nbsp;FAQ
            </Typography>
            <div className="question" style={{ borderBottom: "1px solid white"}}>
                <div className="sub-question">
                    <Typography variant="h3" className="text">
                        Подробнее про navec.
                    </Typography>
                    <button onClick={() => setClicked(!isClicked)}>
                        <Typography variant="h3" className="arrow">
                            <img src="../../arrow.svg" alt="arrow"/>
                        </Typography>
                    </button>
                </div>
                <DropdownFaq isClicked={isClicked} />
            </div>
        </div>
    );
};

export default Faq;
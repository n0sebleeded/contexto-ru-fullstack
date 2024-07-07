import React from "react";
import { motion } from "framer-motion";
import './wave-text.css'
import { WaveTextProps } from "./@types.ts";

const WaveText:React.FC<WaveTextProps> = ({text}) => {
    return (
        <div className="wave-text">
            {Array.from(text).map((char, index) => (
                char === " " ? (
                    <span key={index}>&nbsp;</span>
                ) : (
                    <motion.span
                        key={index}
                        style={{
                            display: "inline-block",
                            fontSize: "18px",
                            fontWeight: "bold",
                            textAlign: "left"
                        }}
                        initial={{ y: 0 }}
                        animate={{
                            y: [0, -5, 0]
                        }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: index * 0.05,  repeatDelay: 2 }}
                    >
                        {char}
                    </motion.span>
                )
            ))}
        </div>
    );
};

export default WaveText;

import React from "react";
import { motion } from "framer-motion";
import '../components-style/wave-text.css'

const WaveText:React.FC = () => {
    const text = "Рассчитываем...";

    return (
        <div className="wave-text">
            {text.split("").map((char, index) => (
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
            ))}
        </div>
    );
};

export default WaveText;

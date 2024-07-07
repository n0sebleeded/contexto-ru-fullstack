import React from 'react';
import { motion } from "framer-motion";
import { MotionDivProps } from "./@types.ts";

const MotionDiv:React.FC<MotionDivProps> = ({variant, children}) => {
    return (
        <motion.div
            variants={variant}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{overflow: 'hidden'}}
        >
            {children}
        </motion.div>
    );
};

export default MotionDiv;
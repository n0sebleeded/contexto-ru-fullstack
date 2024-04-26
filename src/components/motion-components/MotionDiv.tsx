import React, {ReactNode} from 'react';
import {motion, Variants} from "framer-motion";

interface IMotionDivProps {
    variant: Variants;
    children: ReactNode;
}

const MotionDiv:React.FC<IMotionDivProps> = ({variant, children}) => {
    return (
        <motion.div
            variants={variant}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    );
};

export default MotionDiv;
import React, {ReactNode} from 'react';
import {motion} from "framer-motion";

const popup = {
    initial: { scale: 0, transition: { duration: 0.5, type: 'spring' } },
    animate: { scale: 1, transition: { duration: 0.5, type: 'spring' } },
    exit: { opacity: 0, transition: { duration: 0.5, type: 'spring' } },
}

interface IPopupProps {
    children: ReactNode
}

const Popup:React.FC<IPopupProps> = ({children}) => {
    return (
        <motion.div
            variants={popup}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    );
};

export default Popup;
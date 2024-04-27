import React, {ReactNode} from 'react';
import MotionDiv from "./MotionDiv.tsx";

const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0.25, type: 'easeInOut' }
}

interface IPopupProps {
    children: ReactNode
}

const FadeInOut:React.FC<IPopupProps> = ({children}) => {
    return (
        <MotionDiv variant={fadeInOut} children={children} />
    );
};

export default FadeInOut;
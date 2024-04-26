import React, {ReactNode} from 'react';
import MotionDiv from "./MotionDiv.tsx";

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
        <MotionDiv variant={popup} children={children} />
    );
};

export default Popup;
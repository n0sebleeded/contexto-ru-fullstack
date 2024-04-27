import React, {ReactNode} from 'react';
import MotionDiv from "./MotionDiv.tsx";

const rotate = {
    initial: { rotate: 0, transition: { duration: 0.3, type: 'spring' } },
    animate: { rotate: 180, transition: { duration: 0.3, type: 'spring', delay: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.7, type: 'spring' } },
}

interface IRotateProps {
    children: ReactNode
}

const Rotate:React.FC<IRotateProps> = ({children}) => {
    return (
        <MotionDiv variant={rotate} children={children} />
    );
};

export default Rotate;
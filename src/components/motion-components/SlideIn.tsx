import React, {ReactNode} from 'react';
import MotionDiv from "./MotionDiv.tsx";

const slidein = {
    initial: { height: 0 },
    animate: { height: 'auto' },
    exit: { height: 0 },
    transition: { duration: 0.25, type: 'spring' }
};

interface ISlideInProps {
    children: ReactNode
}

const SlideIn:React.FC<ISlideInProps> = ({children}) => {
    return (
        <MotionDiv variant={slidein} children={children}/>
    );
};

export default SlideIn;
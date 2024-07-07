import { Variants } from "framer-motion";
import { ReactNode } from "react";

export interface MotionDivProps {
    variant: Variants;
    children: ReactNode;
}

export interface WaveTextProps {
    text: string;
}
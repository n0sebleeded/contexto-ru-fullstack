export const slidein = {
    initial: { height: 0 },
    animate: { height: 'auto' },
    exit: { height: 0 },
    transition: { duration: 0.25, type: 'spring' }
};

export const rotate = {
    initial: { rotate: 0, transition: { duration: 0.3, type: 'spring' } },
    animate: { rotate: 180, transition: { duration: 0.3, type: 'spring', delay: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.7, type: 'spring' } },
}

export const popup = {
    initial: { scale: 0, transition: { duration: 0.5, type: 'spring', mass: 0.1 } },
    animate: { scale: 1, transition: { duration: 0.5, type: 'spring', mass: 0.1, delay: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.5, type: 'spring', mass: 0.1 } },
}

export const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0.25, type: 'easeInOut' }
}
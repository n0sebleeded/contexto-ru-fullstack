import Header from "./components/pages/welcome/Header.tsx";
import './App.css'
import HowToPlay from "./components/pages/welcome/HowToPlay.tsx";
import WordsForm from "./components/pages/word-form/WordsForm.tsx";
import WordsHistory from "./components/pages/words-history/WordsHistory.tsx";
import { useSelector } from "react-redux";
import { IRootStateGame } from "./shared/redux/actions.ts";
import { AnimatePresence } from "framer-motion";
import WinPage from "./components/pages/win/WinPage.tsx";
import MotionDiv from "./components/motion-components/MotionDiv.tsx";
import { popup } from "./components/motion-components/vars.ts";

function App() {
    const gameStarted = useSelector((state: IRootStateGame) => state.gameState.isStarted);
    const playerWin = useSelector((state: IRootStateGame) => state.gameState.playerWin);

    return (
        <>
            <Header />
            {playerWin &&
                <WinPage />
            }
            <AnimatePresence mode="wait">
                <MotionDiv variant={popup}>
                    <WordsForm />
                    {gameStarted
                        ? <WordsHistory key="wordsHistory" />
                        : <HowToPlay key="howToPlay" />
                    }
                </MotionDiv>
            </AnimatePresence>
        </>
    );
}

export default App;
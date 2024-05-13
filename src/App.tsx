import Header from "./components/pages/welcome/Header.tsx";
import './App.css'
import HowToPlay from "./components/pages/welcome/HowToPlay.tsx";
import WordsForm from "./components/pages/word-form/WordsForm.tsx";
import WordsHistory from "./components/pages/words-history/WordsHistory.tsx";
import {useSelector} from "react-redux";
import {IRootStateGame} from "./shared/redux/actions.ts";
import {AnimatePresence} from "framer-motion";
import {v4 as uuidv4} from "uuid";
import WinPage from "./components/pages/win/WinPage.tsx";
import MotionDiv from "./components/motion-components/MotionDiv.tsx";
import {popup} from "./components/motion-components/types-d.ts";

function App() {
    const gameStarted = useSelector((state: IRootStateGame) => state.gameState.isStarted);
    const playerWin = useSelector((state: IRootStateGame) => state.gameState.playerWin);

    return (
        <>
            <Header />
            {!playerWin &&
                <WordsForm />
            }
            <AnimatePresence mode="wait">
                <MotionDiv variant={popup}>
                    {gameStarted
                        ? playerWin
                            ? <>
                                <WinPage />
                                <WordsForm />
                                <WordsHistory key={uuidv4()}  />
                              </>
                            : <WordsHistory key={uuidv4()}  />
                        : <HowToPlay key={uuidv4()} />
                    }
                </MotionDiv>
            </AnimatePresence>
        </>
    )
}

export default App

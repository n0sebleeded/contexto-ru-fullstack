import Header from "./components/Header.tsx";
import './App.css'
import HowToPlay from "./components/HowToPlay.tsx";
import WordsForm from "./components/WordsForm.tsx";
import WordsHistory from "./components/WordsHistory.tsx";
import {useSelector} from "react-redux";
import {IRootStateGame} from "./redux/actions.ts";
import {AnimatePresence} from "framer-motion";
import Popup from "./components/motion-components/Popup.tsx";
import {v4 as uuidv4} from "uuid";
import WinPage from "./components/WinPage.tsx";

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
                <Popup>
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
                </Popup>
            </AnimatePresence>
        </>
    )
}

export default App

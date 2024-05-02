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

function App() {
    const gameStarted = useSelector((state: IRootStateGame) => state.gameState.isStarted);

    return (
        <>
            <Header />
            <WordsForm />
            <AnimatePresence mode="wait">
                <Popup>
                    {gameStarted
                        ? <WordsHistory key={uuidv4()} />
                        : <HowToPlay key={uuidv4()} />
                    }
                </Popup>
            </AnimatePresence>
        </>
    )
}

export default App

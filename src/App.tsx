import Header from "./components/Header.tsx";
import './App.css'
import HowToPlay from "./components/HowToPlay.tsx";
import WordsForm from "./components/WordsForm.tsx";
import WordsHistory from "./components/WordsHistory.tsx";
import {useSelector} from "react-redux";
import {IRootStateGame} from "./redux/actions.ts";
import {AnimatePresence} from "framer-motion";
import Popup from "./components/motion-components/Popup.tsx";
import { v4 as uuidv4 } from "uuid";

function App() {
    const gameStarted = useSelector((state: IRootStateGame) => state.gameState.isStarted);
  return (
    <AnimatePresence mode="wait">
        <Header />
        <WordsForm />
        <AnimatePresence mode="wait">
            {gameStarted
                ? <Popup key={uuidv4()}>
                    <WordsHistory />
                </Popup>
                : <Popup key={uuidv4()}>
                    <HowToPlay />
                </Popup>
            }
        </AnimatePresence>
    </AnimatePresence>
  )
}

export default App

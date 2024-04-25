import Header from "./components/Header.tsx";
import './App.css'
import HowToPlay from "./components/HowToPlay.tsx";
import WordsForm from "./components/WordsForm.tsx";
import WordsHistory from "./components/WordsHistory.tsx";
import {useSelector} from "react-redux";
import {IRootStateGame} from "./redux/actions.ts";

function App() {
    const gameStarted = useSelector((state: IRootStateGame) => state.gameState.isStarted);
  return (
    <>
        <Header />
        <WordsForm />
        {gameStarted
            ? <WordsHistory />
            : <HowToPlay />}
    </>
  )
}

export default App

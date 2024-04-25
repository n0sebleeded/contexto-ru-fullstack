import Header from "./components/Header.tsx";
import './App.css'
import HowToPlay from "./components/HowToPlay.tsx";
import WordsForm from "./components/WordsForm.tsx";
import WordsHistory from "./components/WordsHistory.tsx";

function App() {
  return (
    <>
        <Header />
        <WordsForm />
        <HowToPlay />
        <WordsHistory />
    </>
  )
}

export default App

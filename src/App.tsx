import Header from "./components/Header.tsx";
import './App.css'
import HowToPlay from "./components/HowToPlay.tsx";
import WordsForm from "./components/WordsForm.tsx";

function App() {
  return (
    <>
        <Header />
        <WordsForm />
        <HowToPlay />
    </>
  )
}

export default App

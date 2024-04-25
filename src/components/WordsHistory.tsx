import React, {useEffect} from 'react';
import WordsAns from "./WordsAns.tsx";
import { v4 as uuidv4 } from 'uuid';

const kvArray = [
    { key: "козявка", value: 1000 },
    { key: "орбита", value: 160 },
    { key: "космос", value: 73 },
];
kvArray.sort((a, b) => a.value - b.value);
const current = { key: "орбита", value: 160 } //Example testing, will be removed;


//TODO: implement linked list?
const WordsHistory:React.FC = () => {

    /*useEffect(() => {
        Axios request --> value;
        kvArray += value;
        kvArray.sort((a, b) => a.value - a.value);
        last = key;
    }, [kvArray]);*/

    useEffect(() => {
        const lastNode = current.key;
        const elements = document.querySelectorAll("#wrapper"); // Assuming elements have id "wrapper"

        elements.forEach(element => {
            const textContent = element.textContent;
            const textWithoutNumbers= textContent ? textContent.replace(/\d+/g, '') : "";

            if (textWithoutNumbers == lastNode) {
                element.classList.add("current");
            }
        });
    }, []);

    return (
        <>
            {kvArray.map(({key, value}) => (
                <WordsAns key={uuidv4()} word={key} value={value} />
            ))}
        </>
    );
};

export default WordsHistory;
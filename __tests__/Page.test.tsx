import { render } from '@testing-library/react';
import WordsForm from "../src/components/pages/word-form/WordsForm";
import {Provider} from "react-redux";
import store from "../src/shared/redux/store";

test('renders without crashing', () => {
    render(
        <Provider store={store}>
            <WordsForm/>
        </Provider>
    );
});

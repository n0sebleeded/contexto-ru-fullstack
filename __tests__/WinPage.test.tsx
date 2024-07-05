import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import WordsForm from "../src/components/pages/word-form/WordsForm";
import WinPage from "../src/components/pages/win/WinPage";
import {IRootStateGame} from "../src/shared/redux/actions";
import {CSymbol} from "../src/components/pages/win/types-d";

const initialGameState: IRootStateGame = {
    gameState: {
        guesses: [{key: 'word', value: 1}],
        lastGuess: { key: "", value: 0, isLoading: false },
        playerWin: false,
        counter: { green: 5, orange: 3, red: 2 },
        isStarted: false,
        word: "",
        wordDoesNotExist: false,
        wordLengthError: false,
        wordRepeat: false,
    },
};

const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;
let mock: MockAdapter;
const SERVER_URL = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL as string;

describe('WinPage Component', () => {
    beforeEach(() => {
        store = mockStore(initialGameState);
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('renders WinText with correct guesses count', () => {
        render(
            <Provider store={store}>
                <WinPage />
            </Provider>
        );

        expect(screen.getByText(/за 1 попыток/i)).toBeInTheDocument();
    });

    it('renders RenderColorSymbols with correct colors and symbols', () => {
        render(
            <Provider store={store}>
                <WinPage />
            </Provider>
        );

        expect(screen.getAllByText(CSymbol.green)).toHaveLength(5);
        expect(screen.getAllByText(CSymbol.orange)).toHaveLength(3);
        expect(screen.getAllByText(CSymbol.red)).toHaveLength(2);
    });

    it('renders WinPageButtons', () => {
        render(
            <Provider store={store}>
                <WinPage />
            </Provider>
        );

        expect(screen.getByRole('button-prev-games')).toBeInTheDocument();
        expect(screen.getByRole('button-share')).toBeInTheDocument();
    });

    it('renders WinPage with correct data and dispatches actions', async () => {
        const word = 'ручка';
        const apiResponse = 1;

        mock.onGet(`${SERVER_URL}/api/similarity?word=${word}`).reply(200, apiResponse);

        render(
            <Provider store={store}>
                <WordsForm />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('type a word'), {
            target: { value: word },
        });
        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            const actions = store.getActions();
            expect(actions).toContainEqual({
                type: 'gameState/addGuess',
                payload: { key: word, value: apiResponse, isLoading: false },
            });
        });

        render(
            <Provider store={store}>
                <WinPage />
            </Provider>
        );

        expect(screen.getByText(/Поздравляем!/i)).toBeInTheDocument();
        expect(screen.getByText(/за 1 попыток/i)).toBeInTheDocument();
        expect(screen.getAllByText(CSymbol.green)).toHaveLength(5);
        expect(screen.getAllByText(CSymbol.orange)).toHaveLength(3);
        expect(screen.getAllByText(CSymbol.red)).toHaveLength(2);
        expect(screen.getByRole('button-prev-games')).toBeInTheDocument();
        expect(screen.getByRole('button-share')).toBeInTheDocument();
    });
});

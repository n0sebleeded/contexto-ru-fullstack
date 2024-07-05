import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import WordsForm from './../src/components/pages/word-form/WordsForm';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    setLoading,
    setWordExistence,
    setError,
    addGuess, initialState,
} from '../src/shared/redux/reducers/gameStateSlice';
import {IRootStateGame} from "../src/shared/redux/actions";

const mockStore = configureStore<IRootStateGame>();

const initialGameState: IRootStateGame = {
    gameState: initialState
};

const SERVER_URL = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL as string;

describe('WordsForm Component', () => {
    let store: MockStoreEnhanced<IRootStateGame>;
    let mock: MockAdapter;

    beforeEach(() => {
        store = mockStore(initialGameState);
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <WordsForm />
            </Provider>
        );

        expect(screen.getByPlaceholderText('type a word')).toBeInTheDocument();
    });

    it('dispatches setLoading action on submit', () => {
        render(
            <Provider store={store}>
                <WordsForm />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('type a word'), {
            target: { value: 'testword' },
        });
        fireEvent.submit(screen.getByRole('form'));

        const actions = store.getActions();
        expect(actions).toContainEqual(setLoading({ isLoading: true }));
    });

    it('shows error if word is empty on submit', () => {
        render(
            <Provider store={store}>
                <WordsForm />
            </Provider>
        );

        fireEvent.submit(screen.getByRole('form'));

        const actions = store.getActions();
        expect(actions).toContainEqual(setLoading({ isLoading: false }));
        expect(actions).toContainEqual(setError({ wordLengthError: true }));
    });

    it('makes API request and updates state on valid word submit', async () => {
        const word = 'testword';
        const apiResponse = 700;

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
            expect(actions).toContainEqual(setLoading({ isLoading: false }));
            expect(actions).toContainEqual(addGuess({ key: word, value: apiResponse, isLoading: false }));
        });
    });

    it('handles API error and dispatches setWordExistence', async () => {
        const word = 'invalidword';

        mock.onGet(`${SERVER_URL}/api/similarity?word=${word}`).reply(200, 'invalid');

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
            expect(actions).toContainEqual(setWordExistence({ wordDoesNotExist: true }));
        });
    });
});

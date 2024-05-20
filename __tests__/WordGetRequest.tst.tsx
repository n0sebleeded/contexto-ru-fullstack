import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

describe('Axios get request', () => {
    test('Correct word and data value', async () => {
        const mock = new MockAdapter(axios);
        const spy = jest.spyOn(axios, 'get');

        mock.onGet('http://localhost:3000/api/similarity?word=$ручка')
            .reply(200, 5);

        const response = await axios.get('http://localhost:3000/api/similarity?word=$ручка');
        expect(response.data).toBe(5);
        expect(spy).toHaveBeenCalled();
    })
    test('Incorrect returned data value', () => {
        const mock = new MockAdapter(axios);
        const spy = jest
        mock.onGet('http://localhost:3000/api/similarity?word=$ручка')
            .reply(200, );

    })
})
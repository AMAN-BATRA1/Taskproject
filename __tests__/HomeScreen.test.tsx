import React from "react";
import Login from "../src/screens/Login"
import TextinputFunction from "../src/components/TextinputFunction"
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import HomeScreen from "../src/screens/HomeScreen";

const mockAxios = new MockAdapter(axios);

afterEach(cleanup)
it("Axios test", () => {
    let navigation = {
        navigate: jest.fn(),
    };
    const { getByTestId, getByText, getAllByTestId } = render(<HomeScreen navigation={navigation} />);
    mockAxios
        .onGet("https://jsonplaceholder.typicode.com/posts")
        .reply(200, {
            name: "value from the api",
            title: "aman",
            body: "123"
        })
})


import React from "react";
import Login from "../src/screens/Login"
import TextinputFunction from "../src/components/TextinputFunction"
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mockAxios = new MockAdapter(axios);
jest.mock("../src/components/TextinputFunction")


let firebase = {
    auth: () => {
        return {
            signInWithEmailAndPassword: jest.fn(),
        };
    },
};

it("render Login placeholder", () => {
    let navigation = {
        navigate: jest.fn(),
    };


    const { getAllByTestId, getByPlaceholderText } = render(<Login navigation={navigation} />)
    expect(getByPlaceholderText('Email').children.length).toBe(1);
    expect(getByPlaceholderText('Password').children.length).toBe(1);
    // const EmailTextinput = getByPlaceholderText("write msg")
    // fireEvent.changeText(getByTestId("EmailInput"), "batraaman720@gmail.com")
    // fireEvent.changeText(getByTestId("PasswordInput"), "Aman@1996")
    // fireEvent.press(getByTestId("LoginButton"))

})

it('Textchange and Submit button', async () => {
    let navigation = {
        navigate: jest.fn(),
    };


    const { getByTestId, getByText, getAllByTestId } = render(<Login navigation={navigation} />);
    const email = fireEvent.changeText(getByTestId('EmailInput'), 'abc');
    const password = fireEvent.changeText(getByTestId('PasswordInput'), 'Aman@1996');
    // fireEvent.press(getByTestId('LoginButton'));
});

it('navigation to Signup', () => {
    let navigation = {
        navigate: jest.fn(),
    };
    const { getByTestId, getByText } = render(<Login navigation={navigation} />);
    fireEvent.press(getByTestId('SignupNavigationButton'));
    expect(navigation.navigate).toBeCalledWith('SignUp');
});

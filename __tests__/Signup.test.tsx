import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUp from '../src/screens/Signup';

let firebase = {
    auth: () => {
        return {
            createUserWithEmailAndPassword: jest.fn(),
        };
    },
};
it('Check placeholders', () => {
    let navigation = {
        navigate: jest.fn(),
    };
    const { getByPlaceholderText } = render(
        <SignUp navigation={navigation} />,
    );
    expect(getByPlaceholderText('Name').children.length).toBe(1);
    expect(getByPlaceholderText('Email').children.length).toBe(1);
    expect(getByPlaceholderText('Password').children.length).toBe(1);
});

it('navigation to Login', () => {
    let navigation = {
        navigate: jest.fn(),
    };
    const { getByTestId, getByText } = render(<SignUp navigation={navigation} />);
    fireEvent.press(getByTestId('Nav.Login'));
    expect(navigation.navigate).toBeCalledWith('Login');
});

it('show error messages', () => {
    let navigation = {
        navigate: jest.fn(),
    };

    const { getByTestId, getByText } = render(<SignUp navigation={navigation} />);
    fireEvent.press(getByTestId('Register'));
});

it('check submission', () => {
    let navigation = {
        navigate: jest.fn(),
    };

    const { getByTestId, getByText } = render(<SignUp navigation={navigation} />);
    fireEvent.changeText(getByTestId('Name'), 'abc');
    fireEvent.changeText(getByTestId('EmailInput'), 'abc');
    fireEvent.changeText(getByTestId('PasswordInput'), '123');
    fireEvent.press(getByTestId('Register'));
});

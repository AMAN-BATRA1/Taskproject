import React from "react";
import Login from "../src/screens/Login"
import TextinputFunction from "../src/components/TextinputFunction"
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import HomeScreen from "../src/screens/HomeScreen";
import PostDatilScreen from "../src/screens/PostDetailScreen";

const mockAxios = new MockAdapter(axios);

afterEach(cleanup)
it("Comment Api test", () => {
    let navigation = {
        navigate: jest.fn(),
    };
    let props = {
        props: jest.fn(),
    }
    const { getByTestId, getByText, getAllByTestId } = render(<PostDatilScreen navigation={navigation} props={props} />);
    mockAxios
        .onGet("https://jsonplaceholder.typicode.com/posts/1/comments")
        .reply(200, {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        },)
})

it("Photos Api test", () => {
    let navigation = {
        navigate: jest.fn(),
    };
    let props = {
        props: jest.fn(),
    }
    const { getByTestId, getByText, getAllByTestId } = render(<PostDatilScreen navigation={navigation} props={props} />);
    mockAxios
        .onGet("https://jsonplaceholder.typicode.com/posts/1/photos")
        .reply(200, {
            albumId: 1,
            id: 1,
            title: "accusamus beatae ad facilis cum similique qui sunt",
            url: "https://via.placeholder.com/600/92c952",
            thumbnailUrl: "https://via.placeholder.com/150/92c952"
        },)
})


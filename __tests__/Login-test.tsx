import Login from "../src/screens/Login"
import TextinputFunction from "../src/components/TextinputFunction"
import { render, fireEvent } from "@testing-library/react-native";
import auth from '@react-native-firebase/auth';

it("render Login Components", () => {
    const propsMock = jest.fn()
    const { getByTestId } = render(<Login props={propsMock} />)
    fireEvent.changeText(getByTestId("EmailInput"), "batraaman720@gmail.com")
    fireEvent.changeText(getByTestId("PasswordInput"), "Aman@1996")
    fireEvent.press(getByTestId("LoginButton"))
})

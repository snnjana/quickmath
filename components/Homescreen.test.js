import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe("HomeScreen", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it("displays result after successful addition", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ result: "5" }),
        });

        const { getByText, getByPlaceholderText } = render(<HomeScreen />);
        
        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");
        
        fireEvent.changeText(num1Input, "2");
        fireEvent.changeText(num2Input, "3");

        const addButton = getByText("Add");
        fireEvent.press(addButton);
        
        await waitFor(() => { 
                expect(getByText("= 5")).toBeTruthy();
            });
    });

    it("correctly handles fraction input", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ result: "1.5" }),
        });

        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");

        fireEvent.changeText(num1Input, "3/2");
        fireEvent.changeText(num2Input, "0");

        const addButton = getByText("Add");
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText("= 1.5")).toBeTruthy();
        });
    });

    it("displays error for invalid fraction", async () => {
        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");

        fireEvent.changeText(num1Input, "2/0"); 
        fireEvent.changeText(num2Input, "5");

        const addButton = getByText("Add");
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText("Please enter valid numbers or fractions.")).toBeTruthy();
        });
    });

    it("displays 0 for empty inputs", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ result: "0" }),
        });

        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");

        fireEvent.changeText(num1Input, "");
        fireEvent.changeText(num2Input, "");

        const addButton = getByText("Add");
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText("= 0")).toBeTruthy();
        });
    });

    it("displays error message for invalid input", async () => {
        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");

        fireEvent.changeText(num1Input, "abc");
        fireEvent.changeText(num2Input, "5");

        const addButton = getByText("Add");
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText("Please enter valid numbers or fractions.")).toBeTruthy();
        });
    });

    it("displays result after successful subtraction", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ result: "1" }),
        });

        const { getByText, getByPlaceholderText } = render(<HomeScreen />);
        
        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");
        
        fireEvent.changeText(num1Input, "5");
        fireEvent.changeText(num2Input, "4");

        const subtractButton = getByText("Subtract");
        fireEvent.press(subtractButton);
        
        await waitFor(() => {
            expect(getByText("= 1")).toBeTruthy();
        });
    });

    it("displays error message for server errors", async () => {
        fetch.mockRejectedValueOnce(new Error("Server error"));

        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");
        
        fireEvent.changeText(num1Input, "2");
        fireEvent.changeText(num2Input, "3");

        const addButton = getByText("Add");
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText("Something went wrong. Please try again.")).toBeTruthy();
        });
    });

    it("displays clear button functionality", () => {
        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");

        fireEvent.changeText(num1Input, "10");
        fireEvent.changeText(num2Input, "5");

        const clearButton = getByText("Clear");
        fireEvent.press(clearButton);

        expect(num1Input.props.value).toBe("");
        expect(num2Input.props.value).toBe("");
    });

    it("clears result and shows error when invalid input is entered after valid input", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ result: "5" }),
        });

        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        const num1Input = getByPlaceholderText("First number");
        const num2Input = getByPlaceholderText("Second number");

        fireEvent.changeText(num1Input, "2");
        fireEvent.changeText(num2Input, "3");

        const addButton = getByText("Add");
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText("= 5")).toBeTruthy();
        });

        fireEvent.changeText(num1Input, "2/0");
        fireEvent.changeText(num2Input, "3");

        fireEvent.press(addButton);

        await waitFor(() => {
            expect(getByText("Please enter valid numbers or fractions.")).toBeTruthy();
        });
    });
});

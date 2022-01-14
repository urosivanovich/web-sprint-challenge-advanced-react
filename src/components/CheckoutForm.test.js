import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";


test("renders without errors", () => {
    render (<CheckoutForm />)
    const header = screen.queryByText(/checkout form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/checkout form/i);

});

test("shows success message on submit with form details", () => {
    render(<CheckoutForm />)

    const typeFirst = screen.getByLabelText(/first name:/i)
    const typeLast = screen.getByLabelText(/last name:/i)
    const typeAddress = screen.getByLabelText(/address:/i)
    const typeCity = screen.getByLabelText(/city:/i)
    const typeState = screen.getByLabelText(/state:/i)
    const typeZip = screen.getByLabelText(/zip:/i)
    const button = screen.getByRole('button')

    const successMsg = () => screen.getByTestId('successMessage')

    userEvent.type(typeFirst, 'Bugsy')
    userEvent.type(typeLast, 'Bugs')
    userEvent.type(typeAddress, '88 Remsen St')
    userEvent.type(typeCity, 'Brooklyn')
    userEvent.type(typeState, 'New York')
    userEvent.type(typeZip, '11201')
    userEvent.click(button)

    expect(successMsg()).toBeInTheDocument()
    expect(successMsg().children[4]).toHaveTextContent('Bugsy Bugs')
    expect(successMsg().children[5]).toHaveTextContent('88 Remsen St')
    expect(successMsg().children[6]).toHaveTextContent('Brooklyn, New York 11201')

});

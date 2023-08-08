import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.getByText(/contact form/i);
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "four");
  const errorMessage = screen.getByText(/error: firstName/i);
  expect(errorMessage).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);
  const firstNameErrorMessage = screen.getByText(/error: firstName/i);
  const lastNameErrorMessage = screen.getByText(/error: lastName/i);
  const emailErrorMessage = screen.getByText(/error: email/i);
  expect(firstNameErrorMessage).toBeInTheDocument();
  expect(lastNameErrorMessage).toBeInTheDocument();
  expect(emailErrorMessage).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "validName");
  const lastNameInput = screen.getByLabelText(/last name/i);
  userEvent.type(lastNameInput, "lastName");
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);
  const emailErrorMessage = screen.getByText(/error: email/i);
  expect(emailErrorMessage).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "invalidEmail");
  const errorMessage = screen.getByText(/error: email/i);
  expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);
  const errorMessage = screen.getByText(/error: lastName/i);
  expect(errorMessage).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "validName");
  const lastNameInput = screen.getByLabelText(/last name/i);
  userEvent.type(lastNameInput, "lastName");
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "22@gmail.com");
  const submitButton = screen.getByRole("button");
  const errorMessage = screen.queryByText(/error: message/i);
  expect(errorMessage).not.toBeInTheDocument();
  userEvent.click(submitButton);
  const firstNameText = screen.getByText(/validName/i);
  const lastNameText = screen.getByText(/lastName/i);
  const emailText = screen.getByText(/22@gmail.com/i);
  expect(firstNameText).toBeInTheDocument();
  expect(lastNameText).toBeInTheDocument();
  expect(emailText).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "validName");
  const lastNameInput = screen.getByLabelText(/last name/i);
  userEvent.type(lastNameInput, "lastName");
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(emailInput, "22@gmail.com");
  const messageInput = screen.getByLabelText(/message/i);
  userEvent.type(messageInput, "amessage");
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);
  const firstNameText = screen.getByText(/validName/i);
  const lastNameText = screen.getByText(/lastName/i);
  const emailText = screen.getByText(/22@gmail.com/i);
  const messageText = screen.getByText(/amessage/i);
  expect(firstNameText).toBeInTheDocument();
  expect(lastNameText).toBeInTheDocument();
  expect(emailText).toBeInTheDocument();
  expect(messageText).toBeInTheDocument();
});

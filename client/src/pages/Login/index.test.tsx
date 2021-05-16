import { screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "../../utils/test-utils";
import Login from ".";

afterEach(cleanup);

describe("<Login />", () => {
  test("should display login form with input and button disabled by default", async () => {
    render(<Login />);

    expect(
      screen.getByText(
        "Please enter your email address to see your recent orders"
      )
    ).toBeInTheDocument();

    expect(screen.getByTestId("login-send")).toBeDisabled();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-label")).toBeInTheDocument();

    expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
  });

  test("should display email errors when wrong value entered", async () => {
    render(<Login />);

    const emailInput = screen.getByTestId("email-input");

    const invalidEmail = "test";
    userEvent.type(emailInput, invalidEmail);

    expect(screen.getByTestId("login-send")).toBeDisabled();
    expect(screen.getByTestId("email-error")).toBeInTheDocument;
    expect(screen.getByTestId("email-error")).toHaveTextContent(
      "Please enter a valid email"
    );
  });

  test("should allow to submit form if valid email id entered", async () => {
    render(<Login />);

    const emailInput = screen.getByTestId("email-input");

    const validEmail = "test@test.com";
    userEvent.type(emailInput, validEmail);

    expect(screen.getByTestId("login-send")).not.toBeDisabled();
    expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
  });
});

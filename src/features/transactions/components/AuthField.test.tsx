import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils/renderWithProviders";
import { AuthField } from "./AuthField";

vi.spyOn(console, "error").mockImplementation(() => {});

describe("AuthField", () => {
  it("should login and then logout correctly", async () => {
    const user = userEvent.setup();

    renderWithProviders(<AuthField />, {
      withAuth: true,
    });

    const loginButton = screen.getByRole("button", { name: /Login/i });
    await user.click(loginButton);

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });

    await user.type(emailInput, "warmine44@gmail.com");
    await user.type(passwordInput, "Pigled2007");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Logout/i)).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /Logout/i })
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Login/i })
      ).toBeInTheDocument();
    });
  });

  it("should display error message", async () => {
    const user = userEvent.setup();

    renderWithProviders(<AuthField />, {
      withAuth: true,
    });

    const loginButton = screen.getByRole("button", { name: /Login/i });
    await user.click(loginButton);

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });

    await user.type(emailInput, "warmimememe@gmail.com");
    await user.type(passwordInput, "Pigledddd");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Request failed with status code/i)
      ).toBeInTheDocument();
    });
  });
});

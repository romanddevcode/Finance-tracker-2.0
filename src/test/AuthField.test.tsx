import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils/renderWithProviders";
import { AuthField } from "../components/General/AuthField";

vi.spyOn(console, "error").mockImplementation(() => {});

const mockLogin = vi.fn((email: string, password: string) => {
  if (email === "warminas222@gmail.com") {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Request failed with status code 401"));
});
const mockLogout = vi.fn();

vi.mock("../auth/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    logout: mockLogout,
    register: vi.fn(),
    token: null, // можно переключать на что-то, чтобы показать, что пользователь залогинен
  }),
}));

describe("AuthField", () => {
  it("should login and then logout correctly", async () => {
    const user = userEvent.setup();

    renderWithProviders(<AuthField />, {
      withAuth: false,
    });

    const loginButton = screen.getByRole("button", { name: /Login/i });
    await user.click(loginButton);

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });

    await user.type(emailInput, "warminas222@gmail.com");
    await user.type(passwordInput, "123456789");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        "warminas222@gmail.com",
        "123456789"
      );
    });

    // const logoutButton = screen.getByRole("button", { name: /Logout/i });
    // await user.click(logoutButton);
  });

  it("should display error message", async () => {
    const user = userEvent.setup();

    renderWithProviders(<AuthField />, {
      withAuth: false,
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

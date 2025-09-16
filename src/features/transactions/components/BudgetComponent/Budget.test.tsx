import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../utils/renderWithProviders";
import Budget from "../../../../pages/Budget";

vi.mock("../../hooks/useTransactions", () => ({
  useTransactions: () => ({
    data: [
      { id: 1, amount: 300, type: "expense", category: "food" },
      { id: 2, amount: 200, type: "income", category: "salary" },
    ],
    isLoading: false,
  }),
}));

vi.mock("../../services/budgetService", () => ({
  getBudgetLimitLocal: vi.fn().mockResolvedValue(null),
  getLimitStateLocal: vi.fn().mockResolvedValue(false),
  setBudgetLimitLocal: vi.fn(),
  setLimitStateLocal: vi.fn(),
}));

beforeEach(() => {
  Object.defineProperty(navigator, "onLine", {
    configurable: true,
    value: false,
  });
});

describe("Budget", () => {
  it("should render the Budget component", async () => {
    renderWithProviders(<Budget />, {
      withAuth: true,
    });

    expect(await screen.findByText("Balance")).toBeInTheDocument();
  });
  it("should render the BudgetLimitMain component", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Budget />, {
      withAuth: true,
    });

    const limitFieldButton = screen.getByRole("checkbox", {
      name: /Enable limit of expenses/i,
    });

    await user.click(limitFieldButton);

    const limitNumberField = screen.getByTestId("limitInput");

    await user.type(limitNumberField, "10");

    await waitFor(() => {
      expect(
        screen.getByText("Warning! You have exceeded the limit of expenses")
      ).toBeInTheDocument();
    });
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TransactionsList } from "../components/features/Transactions/TransactionsList";
import { renderWithProviders } from "../utils/renderWithProviders";

// const { t } = useTranslation("transactions");

let items = [
  {
    id: "test-id-1",
    type: "income",
    amount: 100,
    category: "Products",
    date: "2025-07-21",
    description: "Test transaction",
  },
];

vi.mock("../../../../../db/db", async (importActual) => {
  const actual = await importActual<typeof import("../db/db")>();

  return {
    ...actual,
    db: {
      transactions: {
        toArray: () => Promise.resolve([...items]),
        delete: vi.fn((id: string) => {
          items = items.filter((item) => item.id !== id);
          return Promise.resolve();
        }),
      },
    },
  };
});

afterEach(() => {
  items = [
    {
      id: "test-id-1",
      type: "income",
      amount: 100,
      category: "Products",
      date: "2025-07-21",
      description: "Test transaction",
    },
  ];
});

describe("TransactionsList", () => {
  it("should render the TransactionsList component", () => {
    renderWithProviders(<TransactionsList />);
    expect(screen.getByText("Transactions list")).toBeInTheDocument();
    expect(screen.getByText(/Current balance:/i)).toBeInTheDocument();
  });
});

describe("TransactionsList", () => {
  it("should render the transactions in list below", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransactionsList />);

    expect(await screen.findByText(/Test transaction/i)).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Test transaction/i)).not.toBeInTheDocument();
    });
  });
});

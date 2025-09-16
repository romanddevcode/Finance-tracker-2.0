import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/renderWithProviders";
import GoalsPage from "../../../../../pages/GoalsPage";

let mockGoals = [
  {
    id: "test-id-1",
    title: "Test Goal 1",
    targetAmount: 1000,
    currentAmount: 500,
    currency: "EUR",
  },
];

vi.mock("../../../services/goalService", () => ({
  getLocalGoals: () => Promise.resolve([...mockGoals]),
  addLocalGoal: vi.fn((goal: any) => {
    mockGoals.push({
      ...goal,
      id: `test-id-${mockGoals.length + 1}`,
      currentAmount: 0,
      progress: 0,
    });
    return Promise.resolve();
  }),
  updateLocalGoal: vi.fn(),
  deleteLocalGoal: vi.fn(),
}));

vi.mock("../../../hooks/useGoalMutations", async () => {
  const { addLocalGoal } = await import("../../../services/goalService");
  const { testQueryClient: queryClient } = await import(
    "../../../utils/renderWithProviders"
  );

  return {
    useAddGoal: () => ({
      mutateAsync: async (goal: any) => {
        await addLocalGoal(goal);
        queryClient.invalidateQueries({ queryKey: ["goals"] });
      },
    }),
    useDeleteGoal: vi.fn(),
    useUpdateGoal: vi.fn(),
  };
});

beforeEach(() => {
  Object.defineProperty(navigator, "onLine", {
    configurable: true,
    value: false,
  });
});

afterEach(() => {
  mockGoals = [
    {
      id: "test-id-1",
      title: "Test Goal 1",
      targetAmount: 1000,
      currentAmount: 500,
      currency: "EUR",
    },
  ];
});

describe("GoalsPage", () => {
  it("should render the GoalsPage component", async () => {
    renderWithProviders(<GoalsPage />, { withAuth: true });

    expect(await screen.findByText("Test Goal 1")).toBeInTheDocument();
  });

  it("should add a new goal", async () => {
    const user = userEvent.setup();
    renderWithProviders(<GoalsPage />, { withAuth: true });

    const nameInput = screen.getByTestId("goalNameInput");
    const amountInput = screen.getByTestId("goalAmountInput");
    const addBtn = screen.getByRole("button", { name: /add goal/i });

    await user.type(nameInput, "New Goal");
    await user.type(amountInput, "1000");
    await user.click(addBtn);

    await waitFor(() => {
      expect(screen.getByText("New Goal")).toBeInTheDocument();
    });
  });
});
